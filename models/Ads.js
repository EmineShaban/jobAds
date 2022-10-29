const mongoose = require('mongoose')
const URL_PATTERN = /^https?:\/\/.+$/i
const adsSchema = new mongoose.Schema({
    // Headline - string (required),
    // Location - string (required),
    // Company name - string (required),
    // Company description - string (required),
    // Author - object Id (a reference to the User model),
    // Users applied - a collection of Users (a reference to the User model)
    // Note: When a user applies for an ad, their id is added to this collection (Users applied). 
    // Implement objects with the correct data types.
    headline: {
        type: String,
        required: true,
        // minlength: [4, 'Hotel name must be at leats 4 characters long!']
    },
    location: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true,
    },
    usersApplied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

})

const Ads = mongoose.model('Ads', adsSchema)
module.exports = Ads
