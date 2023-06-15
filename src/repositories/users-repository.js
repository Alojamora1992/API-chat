const Model = require('../models/users-model');

//POST
const addUser = (message) => {
    const myUser = new Model(message);
    return myUser.save();
}

//GET
const getUsers = async () => {
    const users = await Model.find();
    return users;
}

module.exports = {
   add: addUser,
   list: getUsers
}