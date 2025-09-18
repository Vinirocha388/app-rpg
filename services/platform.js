import { Platform } from 'react-native';

// Mock storage para web usando localStorage
const webStorage = {
  characters: 'rpg_characters',
  
  async getItem(key) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  
  async setItem(key, value) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  async getAllCharacters() {
    const characters = await this.getItem(this.characters);
    return characters || [];
  },
  
  async saveCharacters(characters) {
    await this.setItem(this.characters, characters);
  },
  
  async initializeWithDefaults() {
    const existing = await this.getAllCharacters();
    if (existing.length === 0) {
      const defaultCharacters = [
        { 
          id: 1, 
          name: 'Aragorn', 
          class: 'Guerreiro', 
          level: 5, 
          health: 150, 
          mana: 30, 
          isRecruited: 0,
          createdAt: new Date().toISOString()
        },
        { 
          id: 2, 
          name: 'Gandalf', 
          class: 'Mago', 
          level: 10, 
          health: 80, 
          mana: 200, 
          isRecruited: 0,
          createdAt: new Date().toISOString()
        },
        { 
          id: 3, 
          name: 'Legolas', 
          class: 'Arqueiro', 
          level: 7, 
          health: 120, 
          mana: 70, 
          isRecruited: 0,
          createdAt: new Date().toISOString()
        },
        { 
          id: 4, 
          name: 'Gimli', 
          class: 'Anão', 
          level: 6, 
          health: 140, 
          mana: 40, 
          isRecruited: 0,
          createdAt: new Date().toISOString()
        },
      ];
      await this.saveCharacters(defaultCharacters);
    }
  }
};

export const isWeb = Platform.OS === 'web';
export { webStorage };
