const ModelUser = require('../models/users-model');
const ModelMarvelCharacter = require('../models/marvelCharacters-model');

const {
    addFavoriteDB,
    getFavoritesByUserQueryDB,
    updateFavoriteDB,
    deleteFavoriteDB,
    getUserByIdDB,
} = require('../repositories/favorites-repository'); 

const marvelCharacters = async (characters) => {
    const marvelCharacters = await Promise.all(characters.map(async (character) => {
        const marvelCharacter = await ModelMarvelCharacter.findOne({ name: character });
        return marvelCharacter;
    }));
    return marvelCharacters;
};

const createFavorite = async (userId,characters) => {    
    try {
        const user = await ModelUser.findById(userId);
        const Objectcharacters = await marvelCharacters(characters);

        if (characters.length !== Objectcharacters.length) {
            return res.status(404).json({ error: 'Algunos personajes no existen' });
        }

        const newFavorite = {
            user: user,
            favoriteCharacters: Objectcharacters,
        };
        return newFavorite;
    } catch (error) {
        console.error('[favoriteService]', error);
        throw new Error('Internal server error.');
    }
};

const addFavorite = async (userId, characters) => {
    try {
        if (!userId || !characters) {
            throw new Error('Missing required parameters.');
        }
        const newFavorite = await createFavorite(userId, characters);
        const addedFavorite = await addFavoriteDB(newFavorite);
        return addedFavorite;
    }catch(error){
        console.error('[favoriteService]', error);
        throw new Error('Internal server error.');
    }
};
    
    
const getFavoritesByUserQuery = async (userQuery) => {
    try {
    return await getFavoritesByUserQueryDB(userQuery);
    } catch (error) {
    console.error('[favoriteService]', error);
    throw new Error('Internal server error.');
    }
};

const updateFavorites = async (userId, charactersToAdd, charactersToRemove) => {
    try {
        if (!userId || (charactersToAdd && charactersToRemove) || (!charactersToAdd && !charactersToRemove)) {
            throw new Error('Invalid parameters. Please provide either charactersToAdd or charactersToRemove.');
        }
        //Mapeo de los datos de favoritos.
        const objectIdFavorite = await getUserByIdDB(userId);
        const objectCharactersToAdd = charactersToAdd ? await marvelCharacters(charactersToAdd) : [];
        const objectCharactersToRemove = charactersToRemove ? await marvelCharacters(charactersToRemove) : [];

        if (objectCharactersToAdd.length > 0) {
            objectCharacters = [...objectIdFavorite.favoriteCharacters, ...objectCharactersToAdd];
            console.log(objectCharactersToAdd);
            //console.log("im here")
        }
        if (objectCharactersToRemove.length > 0) {
            objectCharacters = objectIdFavorite.favoriteCharacters.filter((character) => !objectCharactersToRemove.some((removeChar) => removeChar._id.toString() === character.toString())
            );  
            console.log(objectCharactersToRemove);
            console.log("im here 2");
        }
        console.log(objectCharacters);

        // Actualizar el favorito
        const updatedFavorite = await updateFavoriteDB(objectIdFavorite, objectCharacters);
        return updatedFavorite
    }catch(error){
        console.error('[favoriteService]', error);
        throw new Error('Internal server error.');
    }
}

const deleteFavorites = async (userId) => {
    try {
        if (!userId) {
            throw new Error('Missing required parameters.');
        }
        const deletedFavorite = await deleteFavoriteDB(userId);
        return deletedFavorite;
    } catch (error) {
        console.error('[favoriteService]', error);
        throw new Error('Internal server error.');
    }
};

    
module.exports = {
    addFavorite,
    getFavoritesByUserQuery,
    updateFavorites,
    deleteFavorites,
};