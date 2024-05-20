const mongoose = require('mongoose');







const taskSchima = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    complited: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Tasks", taskSchima)