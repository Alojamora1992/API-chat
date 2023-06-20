const Joi = require('joi');
const {
    addUserDB,
    getUsersDB,
    updateUserDB,
    deleteUserDB
} = require('../repositories/users-repository');

// Esquema de validación con Joi
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    status: Joi.boolean().required()
});

// add user
const addUser = async (data) => {
    // Validar los datos del usuario utilizando el esquema de validación
    const { error, value } = userSchema.validate(data);

    if (error) {
        throw new Error(`Invalid user data: ${error.details[0].message}`);
    }

    try {
        const user = {
            name: value.name,
            email: value.email,
            password: value.password,
            status: value.status
        };

        return await addUserDB(user);
    } catch (error) {
        throw new Error('Failed to add user to the database.');
    }
};

//get all users
const getUsers = async (dataQueryDB) => {
    try {
        const users = await getUsersDB(dataQueryDB);
        return users;
    } catch (error) {
        throw new Error('Failed to retrieve users from the database.');
    }
};

//update user
const updateUser = async (userId, userData) => {
    try {
        const user = await updateUserDB(userId, userData);
        return user;
    } catch (error) {
        throw new Error('Failed to update user in the database.');
    }
};

//delete user
const deleteUser = async (id) => {
    try {
        const user = await deleteUserDB(id);
        return user;
    } catch (error) {
        throw new Error('Failed to delete user from the database.');
    }
};

module.exports ={
    addUser,
    getUsers,
    updateUser,
    deleteUser
}