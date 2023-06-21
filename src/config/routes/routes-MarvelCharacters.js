const {Router} = require('express');
const router = Router();

const {
    getCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} = require('../../controllers/marvelCharacters-controller');

//rutas de mensajes
router.get('/MarvelCharacters', getCharacters);
router.post('/MarvelCharacters', createCharacter);
router.put('/MarvelCharacters', updateCharacter);
router.delete('/MarvelCharacters', deleteCharacter);

module.exports = router;