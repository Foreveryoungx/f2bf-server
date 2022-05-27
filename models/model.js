const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
    },
    message: String
})

module.exports = mongoose.model('Contact', contactSchema)