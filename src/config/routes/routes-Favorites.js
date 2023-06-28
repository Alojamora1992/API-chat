const {Router} = require('express');
const router = Router();

const {
    addFavoriteToUser,
    getUserFavorites,
    deleteFavorites,
    updateFavoriteUser
  } = require('../../controllers/favorites-controller');
  
  
// Agregar un personaje a los favoritos de un usuario
router.post('/users/favorites', addFavoriteToUser); 
// Obtener los favoritos de un usuario
router.get('/users/favorites', getUserFavorites);
// Actualizar los favoritos de un usuario
router.put('/users/favorites', updateFavoriteUser);
// Eliminar los favoritos de un usuario
router.delete('/users/favorites', deleteFavorites);

module.exports = router;