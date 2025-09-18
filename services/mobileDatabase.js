// Database para Mobile usando SQLite
let SQLite;
try {
  SQLite = require('expo-sqlite');
} catch (error) {
  console.warn('SQLite não disponível');
}

export const mobileDatabase = {
  db: null,

  async openDatabase() {
    if (!SQLite) return null;
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync('rpg_characters.db');
    }
    return this.db;
  },

  async initDatabase() {
    const db = await this.openDatabase();
    if (!db) return;
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        class TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        health INTEGER DEFAULT 100,
        mana INTEGER DEFAULT 50,
        isRecruited INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM characters');
    
    if (result.count === 0) {
      const initialCharacters = [
        { name: 'Aragorn', class: 'Guerreiro', level: 5, health: 150, mana: 30 },
        { name: 'Gandalf', class: 'Mago', level: 10, health: 80, mana: 200 },
        { name: 'Legolas', class: 'Arqueiro', level: 7, health: 120, mana: 70 },
        { name: 'Gimli', class: 'Anão', level: 6, health: 140, mana: 40 },
      ];
      
      for (const char of initialCharacters) {
        await db.runAsync(
          'INSERT INTO characters (name, class, level, health, mana) VALUES (?, ?, ?, ?, ?)',
          [char.name, char.class, char.level, char.health, char.mana]
        );
      }
    }
  },

  async getAllCharacters() {
    const db = await this.openDatabase();
    if (!db) return [];
    return await db.getAllAsync('SELECT * FROM characters ORDER BY createdAt DESC');
  },

  async addCharacter(character) {
    const db = await this.openDatabase();
    if (!db) return null;
    const result = await db.runAsync(
      'INSERT INTO characters (name, class, level, health, mana) VALUES (?, ?, ?, ?, ?)',
      [character.name, character.class, character.level || 1, character.health || 100, character.mana || 50]
    );
    return result.lastInsertRowId;
  },

  async removeCharacter(id) {
    const db = await this.openDatabase();
    if (!db) return null;
    return await db.runAsync('DELETE FROM characters WHERE id = ?', [id]);
  },

  async toggleRecruitCharacter(id) {
    const db = await this.openDatabase();
    if (!db) return null;
    return await db.runAsync(
      'UPDATE characters SET isRecruited = NOT isRecruited WHERE id = ?',
      [id]
    );
  },

  async getCharactersByRecruitment(isRecruited) {
    const db = await this.openDatabase();
    if (!db) return [];
    return await db.getAllAsync(
      'SELECT * FROM characters WHERE isRecruited = ? ORDER BY createdAt DESC',
      [isRecruited ? 1 : 0]
    );
  }
};
