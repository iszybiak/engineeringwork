const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config') 
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const listItemRoutes = require('./routes/api/listItems.js')
const listMeetRoutes = require('./routes/api/listMeets.js')



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
app.use('/api/listMeets', listMeetRoutes)
app.get('/', (req, res) => {
    res.send('hello')
} )

app.listen(PORT, () => console.log(`Aplikacja nasłuchuje na porcie http://localhost:${PORT}`))

