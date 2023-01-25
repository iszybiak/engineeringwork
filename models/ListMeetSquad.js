const { Schema, model } = require('mongoose')

const ListMeetSquadSchema = new Schema({
    friendId: {
        type: String
    },
    meetId: {
        type: String
    },
    confirm: {
        type: Number,
        default: 0
    },
    arrived: {
        type: Number,
        default: 0
    }
})

const ListMeetSquad = model('listMeetSquad', ListMeetSquadSchema)
module.exports = ListMeetSquad