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
        const result = await addMessageDB(fullMessage);
        return result;
    }
    catch (error) {
        console.error('[messageService] Error:', error);
        throw new Error('Internal server error.');
    }
    
}
//get Messages
const getMessages = async (filterUserMessages) => {
    try {
        const result = await getMessagesDB(filterUserMessages);
        return result;
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
        const result = await updateMessageDB(id, message);
        return result;
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
        const result = await removeMessageDB(id);
        return result;
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