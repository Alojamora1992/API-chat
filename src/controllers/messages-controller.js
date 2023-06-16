const response = require('../config/middlewares/response');
const messageServices = require('../services/messages-service');

module.exports = {
    //obtener mensajes por query ?user=xxx
    getMessages: async (req,res) => {
        try{
            const filterMessages = req.query.user || null;
            const messageList = await messageServices.getMessages(filterMessages);
            response.success(req, res, messageList, 200)
        } catch (error) {
            response.error(req, res, 'Invalid information', 400, error)
        }
    },
    //crear mensajes
    createMessage: async (req,res) => {
        try{
            const fullMessage = await messageServices.addMessage(req.body.user, req.body.message)
            response.success(req, res, fullMessage,201)
        } catch (error) {
            response.error(req, res, 'Invalid information', 400, error)
        }
    },
    //actualizar mensajes por params.id
    updateMessage: async (req,res) => {
        try{
            const updatedMessage = await messageServices.updateMessage(req.params.id, req.body.message)
            response.success(req, res, updatedMessage,200)
        } catch (error) {
            response.error(req, res, 'Invalid information', 400, error)
        }
    },
    //eliminar mensajes por params.id
    deleteMessage: async (req,res) => {
        try{
            const deletedMessage = await messageServices.deleteMessage(req.params.id)
            response.success(req, res, deletedMessage,200)
        } catch (error) {
            response.error(req, res, 'Invalid information', 400, error)
        }
    }
};

