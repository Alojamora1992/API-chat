const ModelUser = require('../models/users-model');

const addUserDB = async (user) => {
    try {
        const newUser = new ModelUser(user);
        return await newUser.save();
    } catch (error) {
        throw new Error('Error al guardar el usuario en la base de datos.');
    }
};

const getUsersDB = async (dataQueryDB) => {
    try {
        const { filter, skip, limit, sort, projection, population } = dataQueryDB;
        return await ModelUser.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population);
        
    } catch (error) {
        throw new Error('Error al obtener los usuarios de la base de datos.');
    }
};

const updateUserDB = async (id, dataUser) => {
    try {
        const user = await ModelUser.findByIdAndUpdate(id, dataUser, { new: true });
        if (!user) {
            throw new Error('El usuario no existe en la base de datos.');
        }
        return user;
    } catch (error) {
        throw new Error('Error al actualizar el usuario en la base de datos.');
    }
};

const deleteUserDB = async (userId) => {
    try {
        const user = await ModelUser.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('El usuario no existe en la base de datos.');
        }
        return user;
    } catch (error) {
        throw new Error('Error al eliminar el usuario de la base de datos.');
    }
};

const getUserByEmailDB = async (email) => {
    try {
        const user = await ModelUser.findOne({ email });
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario por correo electrónico desde la base de datos.');
    }
};

module.exports = {
    addUserDB,
    getUsersDB,
    updateUserDB,
    deleteUserDB,
    getUserByEmailDB
};