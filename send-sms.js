// const accountSid = "ACf4ac85668cab96748db5aaada279d283"
// const authToken = "7f72055f461fb0d92d1ead89c52f1ce0"
// const notifyServiceSid = 'ISd90caa3cdcbe423266dcf923f07f18f2'
// /*
// const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken =  process.env.TWILIO_ACCOUNT_TOKEN
//  */
//
// const client = require('twilio')(accountSid, authToken)
//
// client.notify.services(notifyServiceSid)
//     .notification.create({
//     toBinding: JSON.stringify({
//     binding_type: 'sms', address: "+48533654751",
//     binding_type: 'sms', address: "+48533654751"
//     }),
//     body: "Sms" })
//     .then(notification => console.log(notification.sid))
//     .catch(error => console.log(error))
//
//
//
//
// //function sendMessage(date) {
// //     client.messages.create({
// //         //to : process.env.MY_PHONE_NUMBER
// //         to: '+48533654751',
// //         from: '+13855264981',
// //         body: 'Dzień dobry, czy będziesz na zajęciach z siatkówki dnia : '+ + '(TAK/NIE)'
// //     })
// //         .then((message) => console.log(message.sid));
//
//     // client.validationRequests
//     //     .create({friendlyName: 'J.M Number', phoneNumber: '+48501809212'})
//     //     .then(validation_request => console.log(validation_request.friendlyName));
//
//     client.outgoingCallerIds.list({phoneNumber: '+48501809212', limit: 20})
//         .then(outgoingCallerIds => outgoingCallerIds.forEach(o => console.log(o.sid)));
// //}




///// twilio was uninstall