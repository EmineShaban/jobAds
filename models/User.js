const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/env')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match:[ /[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+/i, 'Email is invalid']

    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    myAds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ads',
        default: []
    }]
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {

            this.password = hashedPassword
            next()
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User
