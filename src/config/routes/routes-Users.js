const {Router} = require('express');
const router = Router();

const {
    createUsers,
    getUsers,
    updateUser,
    deleteUser,
} = require('../../controllers/users-controller');

//rutas de usuarios
router.post('/users', createUsers);
router.get('/users', getUsers);
router.put('/users', updateUser);
router.delete('/users', deleteUser);

module.exports = router;