const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: 
    {
        type: Number,
        default: 0,
    },
    name:
    {
        type: String,
        default: "No name available",
    },
    description:
    {
        type: String,
        default: "No description available",
    },
    modified:
    {
        type: Date,
        default: Date.now,
    },
});

const ModelMarvelCharacters = mongoose.model('MarvelCharacters', mySchema);

module.exports = ModelMarvelCharacters;