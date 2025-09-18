import { Platform } from 'react-native';
import { webDatabase } from './webDatabase';

// Verificar se é web
const isWeb = Platform.OS === 'web';

// Por enquanto, vou usar só web database para simplificar
const database = webDatabase;

// Exportar funções universais
export const initDatabase = async () => {
  try {
    await database.initDatabase();
    console.log('Database inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar database:', error);
  }
};

export const getAllCharacters = async () => {
  try {
    const characters = await database.getAllCharacters();
    console.log('Personagens carregados:', characters);
    return characters;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return [];
  }
};

export const addCharacter = async (character) => {
  try {
    const result = await database.addCharacter(character);
    console.log('Personagem adicionado:', character);
    return result;
  } catch (error) {
    console.error('Erro ao adicionar personagem:', error);
    return null;
  }
};

export const removeCharacter = async (id) => {
  try {
    const result = await database.removeCharacter(id);
    console.log('Personagem removido:', id);
    return result;
  } catch (error) {
    console.error('Erro ao remover personagem:', error);
    return null;
  }
};

export const toggleRecruitCharacter = async (id) => {
  try {
    const result = await database.toggleRecruitCharacter(id);
    console.log('Status de recrutamento alterado:', id);
    return result;
  } catch (error) {
    console.error('Erro ao recrutar/desertar personagem:', error);
    return null;
  }
};

export const getCharactersByRecruitment = async (isRecruited) => {
  try {
    const characters = await database.getCharactersByRecruitment(isRecruited);
    console.log('Personagens filtrados:', characters);
    return characters;
  } catch (error) {
    console.error('Erro ao buscar personagens por recrutamento:', error);
    return [];
  }
};
