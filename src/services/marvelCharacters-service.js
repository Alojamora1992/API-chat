const ModelMarvelCharacters = require('../models/marvelCharacters-model');
const {
    addCharactersDB,
    getCharactersDB,
    createCharacterDB,
    updateCharacterDB,
    deleteCharacterDB
} = require('../repositories/marvelCharacters-repository');

//fetch characters
const fetchMarvelCharacters = async () => {
    try {
      const response = await fetch(process.env.URL_API_MARVEL);
      const data = await response.json();
      const {results} = data.data;
      const characters = results.map(character => ({
        id: character.id,
        name: character.name,
        description: character.description,
        modified: character.modified,
        //comics: character.comics,
      }));
      return characters;
    } catch (error) {
      console.log('Error:', error);
      return []; // En caso de error, devolvemos un array vacío
    }
  };

//add characters
const addCharacters = async () => {
    try {
        const charactersCount = await ModelMarvelCharacters.countDocuments();
        if (charactersCount === 0) {
          const charactersArray = await fetchMarvelCharacters();
          await addCharactersDB(charactersArray);
        }
    } catch (error) {
        console.log('[MarvelService]:Error saving characters...', error);
    }
};

//obtener characters
const getCharacters = async (queryCharacter) => {

  try { 
      const characters = await getCharactersDB(queryCharacter);
      return characters;
  } catch (error) {
    console.error('[MarvelService] Error:', error); 
    throw new Error('Internal server error.');      
  }
}

//crear characters
const createCharacter = async (character) => {
  try {
    const characterCreated = await createCharacterDB(character);
    return characterCreated;
  } catch (error) {
    console.error('[MarvelService] Error:', error);
    throw new Error('Internal server error.');
  }
}

//update characters
const updateCharacter = async (characterId, character) => {
  try {
    if(!characterId) throw new Error('Missing characterId');
    const characterUpdated = await updateCharacterDB(characterId, character);
    return characterUpdated;
  } catch (error) {
    console.error('[MarvelService] Error:', error);
    throw new Error('Internal server error.');
  }
}

//delete characters
const deleteCharacter = async (characterId) => {
  try {
    if(!characterId) throw new Error('Missing characterId');
    const characterDeleted = await deleteCharacterDB(characterId);
    return characterDeleted;
  } catch (error) {
    console.error('[MarvelService] Error:', error);
    throw new Error('Internal server error.');
  }
}

module.exports = {
  addCharacters,
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter
}

