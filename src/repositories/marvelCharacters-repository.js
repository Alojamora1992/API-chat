const ModelMarvelCharacters = require('../models/marvelCharacters-model');

  const addCharactersDB = async (characters) => {
      try {
        await ModelMarvelCharacters.insertMany(characters,{ordered:true});
        console.log('characters successfully saved in DB...');
      } catch (error) {
        console.log('Error saving characters...', error);
      }
    };

  const getCharactersDB = async (queryCharacter) => {
      try {
          const {filter, skip, limit, sort, projection, population} = queryCharacter;
          return  await ModelMarvelCharacters.find(filter)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .select(projection)
          .populate(population); 
      } catch (error) {
          throw new Error('Error al obtener los personajes de la base de datos.');
      }
  };

  const createCharacterDB = async (character) => {
      try {
        const characterCreated = await ModelMarvelCharacters.create(character);
        return characterCreated;
      } catch (error) {
        throw new Error('Error al crear el personaje en la base de datos.');
      }
    };

  const updateCharacterDB = async (characterId, character) => {
    try {
      const characterUpdated = await ModelMarvelCharacters.findByIdAndUpdate(characterId, character, {new:true});
      return characterUpdated;
    } catch (error) {
      throw new Error('Error al actualizar el personaje en la base de datos.');
    }
  };


  const deleteCharacterDB = async (characterId) => {
      try {
        const characterDeleted = await ModelMarvelCharacters.findByIdAndDelete(characterId);  
        return characterDeleted;
      } catch (error) {
        throw new Error('Error al eliminar el personaje de la base de datos.');
      }
    };
  


  module.exports ={
    addCharactersDB,
    getCharactersDB,
    createCharacterDB,
    updateCharacterDB,
    deleteCharacterDB
  }