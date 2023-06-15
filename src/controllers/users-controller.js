const express = require('express');
const response = require('../config/middlewares/response');
const userServices = require('../services/users-service');
const router = express.Router();

//Metodo POST
router.post('/', (req, res) => {
    const data = req.body;
    userServices.addUser(data)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

//Metodo GET
router.get('/', (req, res) => {
    userServices.getUsers()
        .then(users => {
            response.success(req, res, users, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error',500, err );
        });
});

module.exports = router;