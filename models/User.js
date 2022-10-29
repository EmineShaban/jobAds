const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/env')
const userSchema = new mongoose.Schema({
//     Email - string (required),
// Password - string (required),
// Description of skills - string (required),
// My ads - a collection of Ads (a reference to the Ad Model)
// Note: When a user creates a new ad, a reference to that ad is added to that collection (My ads).
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    // username: {
    //     type: String,
    //     required: [true, 'Username is required'],
    //     unique: true,
    //     match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english letter and numbers']
    // },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    myAds: {
        type: mongoose.Types.ObjectId,
        ref: 'Ads',
        default: []    }
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
