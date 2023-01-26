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
        place: {
            type: String
        },
        price: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 1
        },
        friends: {
            type: [String]
        },
        maker: {
            type: String
        }

})

const ListMeet = model('listMeet', ListMeetSchema)
module.exports = ListMeet //export to use the data in other files