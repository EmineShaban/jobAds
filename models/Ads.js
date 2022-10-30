const mongoose = require('mongoose')
const URL_PATTERN = /^https?:\/\/.+$/i
const adsSchema = new mongoose.Schema({
//     The Headline should be a minimum of 4 characters long
// The Location should be a minimum of 8 characters long
// The Company name should be at least 3 characters
// The Company description should be a maximum of 40 characters long
    headline: {
        type: String,
        required: true,
        minlength: [4, 'headline must be at leats 4 characters long!']
    },
    location: {
        type: String,
        required: true,
        minlength: [8, 'location must be at leats 4 characters long!']

    },
    companyName: {
        type: String,
        required: true,
        minlength: [3, 'company name must be at leats 4 characters long!']

    },
    description: {
        type: String,
        required: true,
        maxlength: [40, 'Description name must be max 40 characters long!']

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
