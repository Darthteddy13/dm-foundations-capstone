require(`dotenv`).config()
const Sequelize = require(`sequelize`)

const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = 
{
    seed: (req,res) =>
    {
        sequelize.query
        (`
            DROP TABLE if exists keys;

            
             CREATE TABLE keys (
                   key_id SERIAL PRIMARY KEY,
                   key_name varchar(255) NOT NULL,
                   use_descr text,
                   use_location varchar(255)
                   );
                
                 INSERT INTO keys(key_name, use_descr, use_location)
                 VALUES ('Factory Exit', 'Med tent and underground exits in factory. ZB-013 and checkpoint doors between new gas and boilers on customs', 'Customs and Factory'),
                 ('Emercom Medical Unit key', 'Opens medical area in front of Kostin', 'Interchange'),
                 ('RB-ORB1', 'Opens armory door east end 4th floor white pawn building. Needed for Inventory Check quest', 'Reserve'),
                 ('ZB-014', 'Opens door in bunker near scav house. Can have 5.45 60 round mags', 'Woods'),
                 ('Marked Key', 'Opens marked room in three-story dorms', 'Customs');
            `)
    },

    getKeys: (req, res) =>
    {
        sequelize.query
        (
            `
            SELECT * FROM keys
            ORDER BY use_location;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    createKey: (req, res) =>
    {
        console.table(req.body)
        const { name, description, location } = req.body;

        sequelize.query
        (`
            INSERT INTO keys (key_name, use_descr, use_location)
            VALUES ('${name}', '${description}', '${location}')
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },
    
    updateKey: (req, res) =>
    {
        const { id } = req.params;
        const { name, useDescr, useLocation } = req.body;


        sequelize.query
        (`
            UPDATE keys
            SET name = '${name}', use_descr = '${useDescr}', use_location = '${useLocation}'
            WHERE key_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    deleteKey: (req, res) =>
    {
        const { id } = req.params;

        sequelize.query
        (`
            DELETE FROM keys
            WHERE '${id}' = key_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    getSorted: (req, res) =>
    {
        const { location } = req.body;

        sequelize.query
        (`
            SELECT *
            FROM keys
            WHERE use_location = '${location}'
        `)
    }

}