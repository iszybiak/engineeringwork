const { Schema, model } = require('mongoose')

const ListMeetSchema = new Schema({
        creation_date: {
            type: Date,
            default: Date.now,
        }, 
        meeting_date: {
            type: Date,
            required: true,
        },
        friends: {
            type: [String]
        }
})

const ListMeet = model('listMeet', ListMeetSchema)
module.exports = ListMeet //export to use the data in other files