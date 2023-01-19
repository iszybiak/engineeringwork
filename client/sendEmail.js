const nodemailer = require('nodemailer');
const e = require("express");



module.exports = function sendEmail(email, date){
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'volleyball_Team@outlook.com',
            pass: 'v!TeaM23.'
        }
    })
    const options = {
        from: 'volleyball_Team@outlook.com',
        to: email,
        subject: 'Zaproszenie',
        text: 'Cześć ! Zapraszam Cię do wspólnej gry' + date + '. Potwierdź swoją obecność tu : http://localhost:8080/#/'
    }

    transporter.sendMail(options, function (err, info) {
        if(err){
            console.log(err);
            return;
        }
        console.log("Send: " +info.response)
    })
}

