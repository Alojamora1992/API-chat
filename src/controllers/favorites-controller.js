const favoriteServices = require('../services/favorites-service');
const response = require('../config/middlewares/response');
const aqp = require('api-query-params');

module.exports = {

    // Agregar un personaje a los favoritos de un usuario
    addFavoriteToUser: async (req, res) => {
        try {
        const userId = req.query.userId;
        const characters = req.body.favoriteCharacters;
        const favorite = await favoriteServices.addFavorite(userId, characters);
        response.success(req, res, favorite, 201);
        } catch (error) {
        response.error(req, res, 'Failed to add favorite', 400, error);
        }
    },

    // Obtener los favoritos de un usuario
    getUserFavorites: async (req, res) => {
        try {
        const userId = aqp(req.query) || null;
        const userFavorites = await favoriteServices.getFavoritesByUserQuery(userId);
        response.success(req, res, userFavorites, 200);
        } catch (error) {
        response.error(req, res, 'Failed to retrieve favorites', 500, error);
        }
    },

    // Actualizar los favoritos de un usuario
    updateFavoriteUser: async (req, res) => {
        try {
        const userId = req.query.userId;
        const charactersToAdd = req.body.favoriteCharacters;
        const charactersToRemove = req.body.removeCharacters;
        const userFavorites = await favoriteServices.updateFavorites(userId, charactersToAdd, charactersToRemove);
        response.success(req, res, userFavorites, 200);
        } catch (error) {
        response.error(req, res, 'Failed to update favorites', 500, error);
        }
    },

    // Eliminar los favoritos de un usuario
    deleteFavorites: async (req, res) => {
        try {
        const userId = req.query.userId;
        const userFavorites = await favoriteServices.deleteFavorites(userId);
        response.success(req, res, userFavorites, 200);
        } catch (error) {
        response.error(req, res, 'Failed to delete favorites', 500, error);
        }
    }
};