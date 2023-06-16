const ModelMessage = require('../models/messages-model')

//POST
const addMessageDB = (message) => {
    const newMessage = new ModelMessage(message);
    newMessage.save();
}
//GET
const getMessagesDB = async (filterUserMessages) => {
    
    let filter = {};
    if (filterUserMessages !== null){
        filter = {user: filterUserMessages};
    }
    const messages = await ModelMessage.find(filter)
    .populate('user','-__v');
    return messages;
}
//PATCH
const updateMessageDB = async (id, message) => {
    
    const foundMessage = await ModelMessage.findByIdAndUpdate(
        {_id: id},
        {message},
        {new: true}
    );
    return foundMessage;
}
//DELETE
const removeMessageDB = async (id) => {
    const foundMessage = await ModelMessage.deleteOne({
        _id: id
    });
    return foundMessage;
}  

module.exports = {
    addMessageDB,
    getMessagesDB,
    updateMessageDB, 
    removeMessageDB,
}