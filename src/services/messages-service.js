const {
    addMessageDB,
    getMessagesDB,
    updateMessageDB, 
    removeMessageDB
} = require('../repositories/messages-repository');


// add Messages
const addMessage = async (user, message) => {
    try {
        if(!user || !message){
            throw new Error('Invalid data');
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        }
        const addedMessage  = await addMessageDB(fullMessage);
        return addedMessage ;
    }
    catch (error) {
        console.error('[messageService] Error:', error);
        throw new Error('Internal server error.');
    }
    
}
//get Messages
const getMessages = async (queryUserMessages) => {
    try {
        const messages = await getMessagesDB(queryUserMessages);
        return messages;
    } catch (error) {
        console.error('[messageService] Error:', error);
        throw new Error('Internal server error.');
    }  
}

//update Messages
const updateMessage = async (id, message) => {
    try{
        if (!id || !message){
            throw new Error('Invalid data');
        }
        const updateMessage = await updateMessageDB(id, message);
        return updateMessage;
    } catch (error) {
        console.error('[messageService] Error:', error);
        throw new Error('Internal server error.');
    }
}

//delete Messages
const deleteMessage = async (id) => {
    try{
        if (!id){
            throw new Error('Invalid data');
        }
        const removeMessage = await removeMessageDB(id);
        return removeMessage;
    } catch (error) {
        console.error('[messageService] Error:', error);
        throw new Error('Internal server error.');
    }
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}