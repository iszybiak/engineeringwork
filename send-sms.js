const accountSid = "AC234646dda78d95b98b53ebf76f09c518"
const authToken = "50c36409ee832d34072d6fd2042a30e4"
/*
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken =  process.env.TWILIO_ACCOUNT_TOKEN
 */

const client = require('twilio')(accountSid, authToken)

client.messages.create({
    //to : process.env.MY_PHONE_NUMBER
    to: '+48533654751',
    from: '+17816705856',
    body: 'Dzień dobry, czy będziesz na zajęciach z siatkówki dnia : '+  + '(TAK/NIE)'
})
.then((message) => console.log(message.sid));