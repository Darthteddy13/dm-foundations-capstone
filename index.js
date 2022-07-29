const { default: axios } = require("axios")

const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
const useLocation = document.querySelector('#loc-used-input')
const descript = document.querySelector(`#description-input`)

const keyList = document.querySelector(`key-list`);

const submitHandler = e =>
{
    e.prevent.default();

    if(!nameInput.value)
    {
        alert ('You must enter a key name');
        return;
    }

    let body = 
    {
        name: nameInput.value,
        location: useLocation.value,
        description: descript.value
    }

    axios.post('/keys', body)
        .then(() =>
        {
            
        })

}

const getKeys = () =>
{
    keyList.innerHTML = '';
    axios.get(`/keys`)
        .then(res => {
            res.data.forEach(e => 
                {
                    let keyCard = `<div class="key-card">
                    <h2> ${e.key_name}, ${e.use_location}</h2>
                    <h3> ${e.use_description} </h3>
                    <button onclick="deleteCard"(${e['key_id']})">Delete</button>
                    </div>
                    `

                    keyList.innerHTML += keyCard;
                })
        })
}