const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    addUserDB,
    getUsersDB,
    updateUserDB,
    deleteUserDB,
    getUserByEmailDB
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
            password: await bcrypt.hash(value.password, 5),
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
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 5);
        }
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

//get user by email
const generateToken = async (dataUser) => {
    const {_id, email, password} = dataUser;
    const payload = { id: _id, email, password };
    const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const userExist = async (email, password) => {
    try {
        const user = await getUserByEmailDB(email);
        // Comprueba si el usuario existe en la base de datos
        if (!user) {
            throw new Error('Invalid credentials email');
        }
        // Compara la contraseña ingresada con la contraseña almacenada
        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials password');
        }
        // Genera un token de autenticación con el ID del usuario como carga útil
        const token = await generateToken(user);
        return token;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports ={
    addUser,
    getUsers,
    updateUser,
    deleteUser,
    userExist
}