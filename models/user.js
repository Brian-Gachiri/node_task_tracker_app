const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, default: null, required: true },
    first_name: { type: String, default: null, required: false },
    last_name: { type: String, default: null, required: false },
    email: { type: String, unique: true , required: true},
    password: { type: String, required: true },
    token: { type: String, default: null },
})

module.exports = mongoose.model('User', userSchema)