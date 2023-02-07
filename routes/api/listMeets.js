const { Router } = require('express')
const ListMeet = require('../../models/ListMeet')
const ListMeetSquad = require('../../models/ListMeetSquad')
const nodemailer = require("nodemailer");
// const twilio = require('twilio');
// const accountSid = "ACf4ac85668cab96748db5aaada279d283";
// const authToken = "7f72055f461fb0d92d1ead89c52f1ce0";
// const client = new twilio(accountSid, authToken);
const Nexmo = require('nexmo');


const router = Router() 

//GET
router.get('/', async (req, res) => {
    try {
        const listMeets = await ListMeet.find() 
        if(!listMeets) throw new Error('No listMeets')
        res.status(200).json(listMeets)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const response = await ListMeet.findById(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.get('/maker/:maker', async(req,res) => {
    const {maker} = req.params
    try {
        const response = await ListMeet.find({maker: maker})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

//POST
router.post('/', async (req, res) => {
    const newlistMeet = new ListMeet(req.body)
    try {
        const listMeet = await newlistMeet.save()
        res.status(200).json(listMeet)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})



//PUT 
router.put('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const response = await ListMeet.findByIdAndUpdate(id, req.body)
        const updated = { ... response._doc, ... req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.put('/friends/:id', async(req,res) => {
    ListMeet.findById(req.params.id, (err, meet) => {
        if(err) return res.status(500).send(err);
        if(!meet) return res.status(404).send("Meet not found.");
        meet.friends.push(req.body.friends);
        meet.save((err) => {
            if(err) return res.status(500).send(err);
            // Send response to client
            res.send("New friend added to meet.");
        });
    });
})
router.delete('/friends/:id', async(req, res) => {
    ListMeet.findById(req.params.id, (err, meet) => {
        if(err) return res.status(500).send(err);
        if(!meet) return res.status(404).send("Meet not found.");
        let friendIndex = meet.friends.indexOf(req.body.friends);
        if(friendIndex === -1) return res.status(404).send("Friend not found in meet.");
        meet.friends.splice(friendIndex, 1);
        meet.save((err) => {
            if(err) return res.status(500).send(err);
// Send response to client
            res.send("Friend deleted from meet.");
        });
    });
});

router.put('/cancelled/:id', async(req,res) => {
    ListMeet.findById(req.params.id, (err, meet) => {
        if(err) return res.status(500).send(err);
        if(!meet) return res.status(404).send("Meet not found.");
        meet.cancelled.push(req.body.cancelled);
        meet.save((err) => {
            if(err) return res.status(500).send(err);
            // Send response to client
            res.send("Friend added to cancelled");
        });
    });
})



//DELETE

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await ListMeet.findByIdAndDelete(id)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

///SQUAD

router.get('/squad/:meetID', async (req, res) => {
    const {meetID} = req.params
    try {
        const listMeetsSquad = await ListMeetSquad.find({meetId: meetID})
        res.status(200).json(listMeetsSquad)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/squad/:meetID/:friendID', async (req, res) => {
    const { meetID, friendID} = req.params
    try {
        const meetSquadById = await ListMeetSquad.findOne({meetId: meetID , friendId: friendID})
        res.status(200).json(meetSquadById)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

//POST
router.post('/squad/', async (req, res) => {
    const newlistMeetSquad = new ListMeetSquad(req.body)
    try {
        const listMeetSquad = await newlistMeetSquad.save()
        res.status(200).json(listMeetSquad)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.put('/squad/:meetID/:friendID', async(req,res) => {
    const { meetID, friendID} = req.params
    try {
        const response = await ListMeetSquad.findOneAndUpdate({meetId: meetID , friendId: friendID}, req.body)
        const updated = { ... response._doc, ... req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
router.put('/squad/:meetID', async(req,res) => {
    const { meetID} = req.params
    try {
        const response = await ListMeetSquad.find({meetId: meetID })
        for(let elem of response){
            elem.confirm = 0
            await elem.save()
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//DELETE

router.delete('/squad/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await ListMeetSquad.findByIdAndDelete(id)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//EMAIL SEND
router.post('/email-send', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'volleyball_team@outlook.com',
            pass: 'v!TeaM23.'
        }
    });

    const mailOptions = {
        from: 'volleyball_team@outlook.com',
        to: req.body.to, // recipient email address
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send('Email sent: ' + info.response);
        }

    });
});

//SMS SEND
// router.post('/sendsms', (req, res) => {
//     const { phoneNumber, message } = req.body;
//     client.messages
//         .create({
//             body: message,
//             from: '+13855264981',
//             to: phoneNumber
//         })
//         .then(() => {
//             res.send('SMS sent successfully');
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });

const nexmo = new Nexmo({
    apiKey: 'f6d75c02',
    apiSecret: 'XzZXWsDv92dg1mEP'
});
router.post('/sms', (req, res) => {
    const to = req.body.to;
    const text = req.body.text;

    nexmo.message.sendSms(
        'Vonage APIs', to, text, { type: 'unicode' },
        (err, responseData) => {
            if(err) {
                res.send(err);
            } else {
                res.send(responseData);
            }
        }
    );
});



module.exports = router