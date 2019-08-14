const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavSchema = new Schema ({
    place: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String
    }
})

module.exports = mongoose.model('Fav', FavSchema)