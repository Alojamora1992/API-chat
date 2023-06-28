const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUser
} = require('../../controllers/users-controller');

// Rutas de usuarios
router.post('/users', createUsers);
router.get('/users', getUsers);
router.put('/users', authMiddleware, updateUser);
router.delete('/users',authMiddleware, deleteUser);

// Ruta de autenticación de usuarios
router.post('/users/login', loginUser);

module.exports = router;
