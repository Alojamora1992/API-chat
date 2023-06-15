const Model = require('../models/messages-model')

//POST
const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}
//GET
const getMessages = async (filterUserMessages) => {
    
    let filter = {};
    if (filterUserMessages !== null){
        filter = {user: filterUserMessages};
    }
    const messages = await Model.find(filter)
    .populate('user','-__v');
    return messages;
}
//PATCH
const updateText = async (id, message) => {
    
    const foundMessage = await Model.findByIdAndUpdate(
        {_id: id},
        {message},
        {new: true}
    );
    return foundMessage;
}
//DELETE
const removeMessage = async (id) => {
    const foundMessage = await Model.deleteOne({
        _id: id
    });
    return foundMessage;
}  

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText, 
    remove: removeMessage,
    
}