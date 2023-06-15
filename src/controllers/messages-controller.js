const express = require('express');
const response = require('../config/middlewares/response');
const messageServices = require('../services/messages-service');
const router = express.Router();

//ruta obtener mensajes
router.get('/', (req,res) => {
    const filterMessages = req.query.user || null;
    console.log(req.query.user)
    messageServices.getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200)
    })
    .catch((error) => { 
        response.error(req, res, 'Unexpected Error', 500, error)
    })
})

//ruta crear mensajes
router.post('/', (req,res) => {
    
    messageServices.addMessage(req.body.user, req.body.message)
    .then((fullMessage) =>{
        response.success(req, res, fullMessage,201)
    })
    .catch((error) => {
        response.error(req, res, 'Invalid information', 400, error)
    })
})

//ruta actualizar mensajes
// router.patch('/:id', (req,res) => {
//     controller.updateMessage(req.params.id, req.body.message)
router.patch('/', (req,res) => {
    messageServices.updateMessage(req.query.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200)
    })
    .catch((error) => {
        response.error(req, res, 'Error interno', 500, error)
    })
})

//ruta eliminar mensajes
router.delete('/:id', (req, res) => {
    messageServices.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, `Usuario con id = ${req.params.id} Eliminado`, 200);
    })
    .catch((error) => {
        response.error(req, res, 'Error interno', 500, error)
    }) 
})

module.exports = router;