const response = require('../config/middlewares/response');
const userServices = require('../services/users-service');
const aqp = require('api-query-params');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    //Metodo POST
    createUsers: async (req, res) => {
        try {
            const data = req.body;
            const result = await userServices.addUser(data);
            response.success(req, res, result, 201);
        } catch (err) {
            response.error(req, res, 'Internal error', 500, err);
        }
    },
    getUsers: async (req, res) => {
        try {
            const dataQuery = aqp(req.query);
            const users = await userServices.getUsers(dataQuery);
            response.success(req, res, users, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.query.id;
            const userData = req.body;
            const user = await userServices.updateUser(userId, userData);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.query.id;
            const user = await userServices.deleteUser(id);
            response.success(req, res, user, 200);
        } catch (err) {
            response.error(req, res, 'Internal Error', 500, err);
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Comprueba si el usuario existe en la base de datos
            const user = await userServices.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials email' });
            }
            // Compara la contraseña ingresada con la contraseña almacenada
            console.log(password);
            console.log(user.password);
            const isPasswordValid = await bcrypt.compare(password,user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials password' });
            }
            // Genera un token de autenticación con el ID del usuario como carga útil
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Devuelve el token al cliente
            return res.status(200).json({ token });
            } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
            }
    }
};
