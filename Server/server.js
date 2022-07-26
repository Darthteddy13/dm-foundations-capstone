require(`dotenv`).config()
const express = require('express')
const app = express()
const cors = require('cors')

const {SERVER_PORT} = process.env;
const { seed, getKeys, createKey, updateKey, deleteKey } = require('./controller.js');


// app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `./index.html`)));

// app.get(`/css`, (req, res) => res.sendFile(path.join(__dirname, `../style.css`)));

// app.get(`/js`, (req, res) => res.sendFile(path.join(__dirname, `../index.js`)));

app.use(express.json());
app.use(cors());

//call seed function
app.post('/seed', seed);

app.get(`/keys`, getKeys);
app.post(`/keys`, createKey);
app.delete(`/keys/:id`, deleteKey);




app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
