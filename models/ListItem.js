const { Schema, model } = require('mongoose')

const User = new Schema({
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
    },
    role: {
        type: String,
        default: "ROLE_BASIC",
    },
    level: {
        type: Number,
        default: 1
    },
    behavior: {
        type: Number,
        default: 0
    }





})

const ListItem = model('listItem', User)
module.exports = ListItem //export to use the data in other files