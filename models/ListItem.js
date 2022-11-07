const { Schema, model } = require('mongoose')

const ListItemSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },


})

const ListItem = model('listItem', ListItemSchema)
module.exports = ListItem //export to use the data in other files