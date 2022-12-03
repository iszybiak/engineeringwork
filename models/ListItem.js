const { Schema, model } = require('mongoose')

const ListItemSchema = new Schema({
        avatar: {
            type: String,
            default: "../client/src/assets/avatar.png",
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        number: {
            type: String,
            required: true,
        }


})

const ListItem = model('listItem', ListItemSchema)
module.exports = ListItem //export to use the data in other files