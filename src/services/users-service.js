const {
    addUserDB,
    getUsersDB,
    updateUserDB,
    deleteUserDB
} = require('../repositories/users-repository')

//add user
const addUser = async (data) => {
    if (!data) {
        return Promise.reject('Invalid user');
    }
    const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        status: data.status,
    }
    return await addUserDB(user);
}

//get all users
const getUsers = async () => {
    try {
        const users = await getUsersDB();
        return users;
    } catch (error) {
        throw error;
    }
};

//update user
const updateUser = async (userId, userData) => {
    try {
        const user = await updateUserDB(userId, userData);
        return user;
    } catch (error) {
        throw error;
    }
};

//delete user
const deleteUser = async (id) => {
    try {
        const user = await deleteUserDB(id);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports ={
    addUser,
    getUsers,
    updateUser,
    deleteUser
}