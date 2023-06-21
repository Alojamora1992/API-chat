const {Router} = require('express');
const router = Router();

const {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage,
} = require('../../controllers/messages-controller');

//rutas de mensajes
router.get('/messages', getMessages);
router.post('/messages', createMessage);
router.put('/messages', updateMessage);
router.delete('/messages', deleteMessage);

module.exports = router;