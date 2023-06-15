const store = require('../repositories/users-repository')

//add user
const addUser = (data) => {
    if (!data) {
        return Promise.reject('Invalid user');
    }
    const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        status: data.status,
    }
    return store.add(user);
}

//get all users
const getUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

module.exports ={
    addUser,
    getUsers
}