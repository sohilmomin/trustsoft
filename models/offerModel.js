const mongoose = require('mongoose')
const Schema = mongoose.Schema
const offerSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Offer', offerSchema)