const ModelFavorite = require('../models/favorites-model');

const addFavoriteDB = async (favorite) => {
  try {
  
    const { user, favoriteCharacters } = favorite;
    // Verificar si el favorito ya existe para el usuario
    const existingFavorite = await ModelFavorite.findOne({ user: user });
    
    if (existingFavorite) {
      // Si el favorito ya existe, actualizarlo con los nuevos personajes favoritos
      existingFavorite.favoriteCharacters = favoriteCharacters;
      await existingFavorite.save();
      return existingFavorite;
    } else {
      // Si el favorito no existe, crear uno nuevo
      const newFavorite = new ModelFavorite(favorite);
      return await newFavorite.save();
    }
  } catch (error) {
    throw new Error('Error al agregar el favorito en la base de datos.');
  }
};

const getFavoritesByUserQueryDB = async (userId) => {
  try {
    const {filter, skip, limit, sort, projection, population} = userId;
    console.log(filter, skip, limit, sort, projection, population);
        
    return  await ModelFavorite.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate('user', '-password')
    .populate('favoriteCharacters');
  } catch (error) {
    throw new Error('Error al obtener los favoritos de la base de datos.');
  }
};

const updateFavoriteDB = async (objectCharacter, character) => {
  try {
    objectCharacter.favoriteCharacters = character;
    await objectCharacter.save();     
    return objectCharacter;
  } catch (error) {
    throw new Error('Error al actualizar los favoritos de la base de datos.');
  }
}

const deleteFavoriteDB = async (userId) => {
  try {
    return await ModelFavorite.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error al eliminar los favoritos de la base de datos.');
  }
};

const getUserByIdDB = async (userId) => {
  try {
    return await ModelFavorite.findById(userId);
  } catch (error) {
    throw new Error('Error al obtener el usuario de la base de datos.');
  }
};

module.exports = {
    addFavoriteDB,
    getFavoritesByUserQueryDB,
    updateFavoriteDB,
    deleteFavoriteDB,
    getUserByIdDB
};