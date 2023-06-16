const {Router} = require('express');
const router = Router();

const {
    createUsers,
    getUsers,
    updateUser,
    deleteUser,
} = require('../../controllers/users-controller');

const {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage,
} = require('../../controllers/messages-controller');

//rutas de usuarios
router.post('/users', createUsers);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//rutas de mensajes
router.get('/messages/', getMessages);
router.post('/messages', createMessage);
router.patch('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;