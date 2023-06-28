const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: 
        {
            type: Schema.ObjectId,
            ref: 'User',
        },
    favoriteCharacters: 
        [{
            type: Schema.ObjectId,
            ref:'MarvelCharacters'
        }],
});

const modelFavorite = mongoose.model('Favorite', mySchema);

module.exports = modelFavorite;