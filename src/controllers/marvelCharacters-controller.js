const response = require('../config/middlewares/response');
const marvelServices = require('../services/marvelCharacters-service');
const aqp = require('api-query-params');

module.exports = {
    //obtener character by query ?name o description o id
    getCharacters: async (req,res) => {
        try{
            marvelServices.addCharacters();
            const filters = aqp(req.query) || null;
            const characterList = await marvelServices.getCharacters(filters);
            response.success(req, res, characterList, 200)
        } catch (error) {
            response.error(req, res, 'Failed to retrieve characters', 500, error)
        }
    },
    //create character
    createCharacter: async (req,res) => {
        try{
            const characterData = req.body;
            const character = await marvelServices.createCharacter(characterData);
            response.success(req, res, character, 201)
        } catch (error) {
            response.error(req, res, 'Failed to create character', 500, error)
        }
    },
    //update character by id
    updateCharacter: async (req,res) => {
        try{
            const characterId = req.query.id;
            const characterData = req.body;
            const character = await marvelServices.updateCharacter(characterId, characterData);
            response.success(req, res, character, 200)
        }
        catch (error) {
            response.error(req, res, 'Failed to update character', 500, error)
        }
    },
    //delete character by id
    deleteCharacter: async (req,res) => {
        try{
            const characterId = req.query.id;
            const character = await marvelServices.deleteCharacter(characterId);
            response.success(req, res, character, 200)
        } catch (error) {
            response.error(req, res, 'Failed to delete character', 500, error)
        }
    },
};