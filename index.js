// const axios = require(`axios`);
const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const descInput = document.querySelector(`#description-input`)
const useLocation = document.querySelector('#loc-used-input')
const descript = document.querySelector(`#description-input`)



const getKeys = () =>
{
    const keyList = document.querySelector(`#keys-list`);
    keyList.innerHTML = '';
    axios.get(`http://localhost:5050/keys`)
        .then(res => {
            console.table(res.data)
            res.data.forEach(e => 
                {
                    
                    let keyCard = `<div class="key-card">
                    <h2> ${e.key_name}, ${e.use_location}</h2>
                    <h3> ${e.use_descr} </h3>
                    <button onclick="deleteCard(${e['key_id']})">Delete</button>
                    </div>
                    `

                    keyList.innerHTML += keyCard;
                })
        })
        .catch(err => console.log(err))
}

const submitHandler = e =>
{
    e.preventDefault();

    if(!nameInput.value)
    {
        alert ('You must enter a key name');
        return;
    }

    if(!descInput.value)
    {
        alert (`You must enter a description`);
        return;
    }

    let body = 
    {
        name: nameInput.value,
        location: useLocation.value,
        description: descript.value
    }

    axios.post('http://localhost:5050/keys', body)
  
        .then(() =>
        {
            console.table(body)
            getKeys();
        })

}


const deleteCard = id =>
{
    axios.delete(`http://localhost:5050/keys/${id}`)
    .then(res => getKeys())
    .catch(err => console.log(err))
}   

getKeys();
form.addEventListener('submit', submitHandler)