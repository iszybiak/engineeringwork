const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config') 
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const listItemRoutes = require('./routes/api/listItems.js')

//TWILIO 
const http = require('http')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/sms', (req , res) => {
    const twiml = new MessagingResponse();

    twiml.message.catch

    twiml.message('Dziękuję za odpowiedź');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
})

//


app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
       // useCreateIndex: true,
        useUnifiedTopology: true,
       // useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected.. '))
    .catch((err) => console.log(err))


app.use('/api/listItems', listItemRoutes)
app.get('/', (req, res) => {

    res.send('hello')
} )

app.listen(PORT, () => console.log(`Aplikacja nasłuchuje na porcie http://localhost:${PORT}`))

