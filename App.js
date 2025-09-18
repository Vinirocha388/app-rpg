import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { Provider as PaperProvider, Text, Button, ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);

  console.log('🎮 App iniciando...');

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('⚡ Inicializando aplicação...');
        
        // Simular dados iniciais
        const defaultCharacters = [
          { 
            id: 1, 
            name: 'Aragorn', 
            class: 'Guerreiro', 
            level: 5, 
            health: 150, 
            mana: 30, 
            isRecruited: 0 
          },
          { 
            id: 2, 
            name: 'Gandalf', 
            class: 'Mago', 
            level: 10, 
            health: 80, 
            mana: 200, 
            isRecruited: 0 
          },
          { 
            id: 3, 
            name: 'Legolas', 
            class: 'Arqueiro', 
            level: 7, 
            health: 120, 
            mana: 70, 
            isRecruited: 0 
          },
          { 
            id: 4, 
            name: 'Gimli', 
            class: 'Anão', 
            level: 6, 
            health: 140, 
            mana: 40, 
            isRecruited: 0 
          },
        ];
        
        setCharacters(defaultCharacters);
        setLoading(false);
        console.log('✅ App carregado com sucesso!');
        
      } catch (err) {
        console.error('❌ Erro ao inicializar:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    initApp();
  }, []);

  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.centerContainer}>
          <StatusBar style="auto" />
          <ActivityIndicator size="large" color="#6200ee" />
          <Text style={styles.loadingText}>Carregando RPG Manager...</Text>
        </View>
      </PaperProvider>
    );
  }

  if (error) {
    return (
      <PaperProvider>
        <View style={styles.centerContainer}>
          <StatusBar style="auto" />
          <Text style={styles.errorTitle}>❌ Erro</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={() => window.location.reload()}>
            Recarregar
          </Button>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        {/* Header simples */}
        <View style={styles.header}>
          <Text style={styles.title}>🎮 RPG Manager</Text>
          <Text style={styles.subtitle}>
            Gerenciador de Personagens ({characters.length} {characters.length === 1 ? 'personagem' : 'personagens'})
          </Text>
        </View>
        
        {/* Lista de personagens */}
        <ScrollView style={styles.content}>
          {characters.map((character) => (
            <View key={character.id} style={styles.characterCard}>
              <View style={styles.characterHeader}>
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.characterClass}>{character.class}</Text>
              </View>
              <View style={styles.characterStats}>
                <Text>Nível: {character.level}</Text>
                <Text>❤️ HP: {character.health}</Text>
                <Text>⚡ MP: {character.mana}</Text>
              </View>
              <Button 
                mode={character.isRecruited ? "outlined" : "contained"}
                onPress={() => {
                  setCharacters(chars => 
                    chars.map(c => 
                      c.id === character.id 
                        ? { ...c, isRecruited: c.isRecruited ? 0 : 1 }
                        : c
                    )
                  );
                }}
                style={styles.recruitButton}
              >
                {character.isRecruited ? 'Desertar' : 'Recrutar'}
              </Button>
            </View>
          ))}
        </ScrollView>

        {/* Botão adicionar */}
        <View style={styles.footer}>
          <Button 
            mode="contained" 
            onPress={() => {
              console.log('🎯 Botão clicado! Adicionando personagem...');
              
              // Arrays para gerar personagens aleatórios
              const nomes = ['Thorin', 'Elara', 'Gareth', 'Luna', 'Kael', 'Zara', 'Darius', 'Mira', 'Vex', 'Nova'];
              const classes = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Paladino', 'Druida'];
              
              const randomNome = nomes[Math.floor(Math.random() * nomes.length)];
              const randomClasse = classes[Math.floor(Math.random() * classes.length)];
              const randomLevel = Math.floor(Math.random() * 5) + 1;
              
              const newChar = {
                id: Date.now(),
                name: randomNome,
                class: randomClasse,
                level: randomLevel,
                health: 80 + (randomLevel * 20),
                mana: 40 + (randomLevel * 15),
                isRecruited: 0
              };
              
              console.log('✨ Novo personagem:', newChar);
              setCharacters(prevChars => {
                const updatedChars = [...prevChars, newChar];
                console.log('📋 Lista atualizada:', updatedChars.length, 'personagens');
                return updatedChars;
              });
            }}
            style={styles.addButton}
          >
            ➕ Adicionar Personagem
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e1bee7',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  characterCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  characterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  characterClass: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  characterStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  recruitButton: {
    marginTop: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});
