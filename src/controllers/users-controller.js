const response = require('../config/middlewares/response');
const userServices = require('../services/users-service');
const aqp = require('api-query-params');


module.exports = {

    //Metodo POST
    createUsers: async (req, res) => {
        try {
            const data = req.body;
            const result = await userServices.addUser(data);
            response.success(req, res, result, 201);
        } catch (err) {
            response.error(req, res,  err.message, 500, err);
        }
    },
    getUsers: async (req, res) => {
        try {
            const dataQuery = aqp(req.query);
            const users = await userServices.getUsers(dataQuery);
            response.success(req, res, users, 200);
        } catch (err) {
            response.error(req, res,  err.message, 500, err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.query.id;
            const userData = req.body;
            const user = await userServices.updateUser(userId, userData);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res,  err.message, 500, err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.query.id;
            const user = await userServices.deleteUser(id);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res,  err.message, 500, err);
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Comprueba si el usuario existe en la base de datos
            const user = await userServices.userExist(email,password);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res, err.message, 500, err);     
        }
    },
};
