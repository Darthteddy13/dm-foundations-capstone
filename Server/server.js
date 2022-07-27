require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const { getKeys, createKey, updateKey, deleteKey } = require('./controller.js')

app.use(express.json())
app.use(cors())
//call seed function
app.post('/seed', seed);

app.get(`/keys`, getKeys);
app.post(`/keys`, createKey);
app.put(`/keys/:id`, updateKey);
app.delete(`/keys/:id`, deleteKey);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
