
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config') 
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const listItemRoutes = require('./routes/api/listItems.js')
const listMeetRoutes = require('./routes/api/listMeets.js')

//TWILIO 
// const http = require('http')
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
//
// app.post('/sms', (req , res) => {
//     const twiml = new MessagingResponse();
//
//     twiml.message.catch
//
//     twiml.message('Dziękuję za odpowiedź');
//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
// });
//
// http.createServer(app).listen(1337, () => {
//     console.log('Express server listening on port 1337');
// })

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
app.use('/api/listMeets', listMeetRoutes)
app.get('/', (req, res) => {
    res.send('hello')
} )

////Auth
//
// const jwt = require('jsonwebtoken')
//
// let refreshTokens = []
// app.use(express.json())
//
// app.post('/token', (req, res) => {
//      const refreshToken = req.body.token
//     if(refreshToken == null) return res.sendStatus(401)
//     if(!refreshToken.includes(refreshToken)) res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//        if(err) return res.sendStatus(403)
//         const accessToken = generateAccessToken({ name: user.name})
//     })
// })
//
// const posts = [
//     {
//         username: 'Kyle',
//         title: 'Post 1'
//     },
//     {
//         username: 'Ann',
//         title: 'Post 1'
//     }
// ]
// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name))
// })
// app.delete('/logout', (req,res) => {
//      refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//     res.sendStatus(204)
// })
// app.post('/login', (req, res) => {
//     const username = req.body.username
//     const user = { name: username}
//
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     res.json({ accessToken: accessToken, refreshToken: refreshToken})
// })
//
// function authenticateToken( req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
//
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res. sendStatus(403)
//         req.user = user
//         next()
//     })
// }
//
// function generateAccessToken(user) {
//      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '15s'})
// }
//////

app.listen(PORT, () => console.log(`Aplikacja nasłuchuje na porcie http://localhost:${PORT}`))

