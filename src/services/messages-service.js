const store = require('../repositories/messages-repository');

// add Messages
const addMessage = (user, message) => {
    return new Promise((resolve, reject) => {
        if (!user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date(),
        };
        store.add(fullMessage);
        resolve(fullMessage);
    });
}
//get Messages
const getMessages = (filterUserMessages) => {
    return new Promise ((resolve, reject) => {
        resolve(store.list(filterUserMessages));
    })
}

//update Messages
const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message){
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    })
}

//delete Messages
const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        if (!id){
            reject('Id invalido');
            return false;
        }
        store.remove(id)
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    })
}


module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}