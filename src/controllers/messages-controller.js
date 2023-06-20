const response = require('../config/middlewares/response');
const messageServices = require('../services/messages-service');
const aqp = require('api-query-params');

module.exports = {
    //obtener mensajes por query ?user=xxx
    getMessages: async (req,res) => {
        try{
            const queryMessages = aqp(req.query) || null;
            const messageList = await messageServices.getMessages(queryMessages);
            response.success(req, res, messageList, 200)
        } catch (error) {
            response.error(req, res, 'Failed to retrieve messages', 500, error)
        }
    },
    //crear mensajes
    createMessage: async (req,res) => {
        try{
            const fullMessage = await messageServices.addMessage(req.body.user, req.body.message)
            response.success(req, res, fullMessage,201)
        } catch (error) {
            response.error(req, res, 'Failed to create message', 400, error)
        }
    },
    //actualizar mensajes por params.id
    updateMessage: async (req,res) => {
        try{
            const messageId = req.query.id;
            const message = req.body.message;
            const updatedMessage = await messageServices.updateMessage(messageId, message)
            response.success(req, res, updatedMessage,200)
        } catch (error) {
            response.error(req, res, 'Failed to update message', 400, error)
        }
    },
    //eliminar mensajes por params.id
    deleteMessage: async (req,res) => {
        try{
            const messageId = req.query.id;
            const deletedMessage = await messageServices.deleteMessage(messageId)
            response.success(req, res, deletedMessage,200)
        } catch (error) {
            response.error(req, res, 'Failed to delete message', 400, error)
        }
    }
};

