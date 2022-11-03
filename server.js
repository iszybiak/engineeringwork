const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config') 

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
       // useCreateIndex: true,
        useUnifiedTopology: true,
       // useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected.. '))
    .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log(`Aplikacja nasłuchuje na porcie http://localhost:${PORT}`))