const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: 
        {
            type: String, 
            default: ' '
        },
    email: 
        {
            type: String, 
            default: ' '
        },
    password: 
        {
            type: String, 
            default: ' '
        },
    status: 
        {
            type: Boolean, 
            default: false
        },
});

const modelUser = mongoose.model('User', mySchema);

module.exports = modelUser;