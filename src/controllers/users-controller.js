const response = require('../config/middlewares/response');
const userServices = require('../services/users-service');

module.exports = {

    //Metodo POST
    createUsers: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await userServices.addUser(data);
            response.success(req, res, result, 201);
        } catch (err) {
            response.error(req, res, 'Internal error', 500, err);
        }
    },
    getUsers: async (req, res, next) => {
        try {
            const users = await userServices.getUsers();
            response.success(req, res, users, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const user = await userServices.updateUser(userId, userData);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await userServices.deleteUser(id);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    }

};
