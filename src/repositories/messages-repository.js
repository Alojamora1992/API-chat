const ModelMessage = require('../models/messages-model');

const addMessageDB = async (message) => {
    try {
        const newMessage = new ModelMessage(message);
        return await newMessage.save();
    } catch (error) {
        throw new Error('Error al agregar el mensaje en la base de datos.');
    }
};

const getMessagesDB = async (queryUserMessages) => {
    try {
        const {filter, skip, limit, sort, projection, population} = queryUserMessages;
        
        return  await ModelMessage.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population); 
        //Si se danacambiar el archivo del controlador que fue el unico que se modifico.
        // let filter = {};
        // if (filterUserMessages !== null) {
        //     filter = { user: filterUserMessages };
        // }
        // const messages = await ModelMessage.find(filter).populate('user', '-__v');
    } catch (error) {
        throw new Error('Error al obtener los mensajes de la base de datos.');
    }
};

const updateMessageDB = async (id, message) => {
    try {
        const updatedMessage = await ModelMessage.findByIdAndUpdate(
            { _id: id },
            { message },
            { new: true }
        );
        return updatedMessage;
    } catch (error) {
        throw new Error('Error al actualizar el mensaje en la base de datos.');
    }
};

const removeMessageDB = async (id) => {
    try {
        await ModelMessage.deleteOne({ _id: id });
        return true;
    } catch (error) {
        throw new Error('Error al eliminar el mensaje de la base de datos.');
    }
};

module.exports = {
    addMessageDB,
    getMessagesDB,
    updateMessageDB,
    removeMessageDB,
};