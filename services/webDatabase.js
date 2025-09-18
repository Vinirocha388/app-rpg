// Database para Web usando localStorage
let nextId = 5;

export const webDatabase = {
  storageKey: 'rpg_characters',

  async getCharacters() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },

  async saveCharacters(characters) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(characters));
    }
  },

  async initDatabase() {
    const existing = await this.getCharacters();
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
      nextId = 5;
    } else {
      // Encontrar próximo ID disponível
      const maxId = Math.max(...existing.map(char => char.id), 0);
      nextId = maxId + 1;
    }
  },

  async getAllCharacters() {
    const characters = await this.getCharacters();
    return characters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async addCharacter(character) {
    const characters = await this.getCharacters();
    const newCharacter = {
      ...character,
      id: nextId++,
      isRecruited: 0,
      createdAt: new Date().toISOString()
    };
    characters.push(newCharacter);
    await this.saveCharacters(characters);
    return newCharacter.id;
  },

  async removeCharacter(id) {
    const characters = await this.getCharacters();
    const filteredCharacters = characters.filter(char => char.id !== id);
    await this.saveCharacters(filteredCharacters);
    return { changes: characters.length - filteredCharacters.length };
  },

  async toggleRecruitCharacter(id) {
    const characters = await this.getCharacters();
    const characterIndex = characters.findIndex(char => char.id === id);
    if (characterIndex !== -1) {
      characters[characterIndex].isRecruited = characters[characterIndex].isRecruited ? 0 : 1;
      await this.saveCharacters(characters);
    }
    return { changes: 1 };
  },

  async getCharactersByRecruitment(isRecruited) {
    const characters = await this.getCharacters();
    const filtered = characters.filter(char => Boolean(char.isRecruited) === isRecruited);
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};
