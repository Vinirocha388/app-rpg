import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { Provider as PaperProvider, Text, Button, ActivityIndicator, Card, Chip, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
// import TeamStats from './components/TeamStats';
// import Header from './components/Header';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState('all');
  const [classFilter, setClassFilter] = useState(null);
  
  // Função auxiliar para obter cor de cada classe
  const getClassColor = (characterClass) => {
    const colors = {
      'Guerreiro': '#e74c3c',
      'Mago': '#3498db',
      'Arqueiro': '#27ae60',
      'Anão': '#f39c12',
      'Paladino': '#9b59b6',
      'Ladino': '#34495e',
      'Bárbaro': '#e67e22',
      'Clérigo': '#f1c40f',
    };
    return colors[characterClass] || '#95a5a6';
  };

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
    console.log('🔄 Renderizando tela de loading...');
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
    console.log('❌ Renderizando tela de erro...');
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

  console.log('🎯 Renderizando app principal com', characters.length, 'personagens');

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        {/* Header com filtros básicos */}
        <View style={styles.header}>
          <Text style={styles.title}>🎮 RPG Manager</Text>
          <Text style={styles.subtitle}>{characters.length} heróis disponíveis</Text>
          
          {/* Filtros simples */}
          <View style={styles.filterRow}>
            <Button 
              mode={filter === 'all' ? 'contained' : 'text'}
              onPress={() => setFilter('all')}
              textColor="white"
              buttonColor={filter === 'all' ? 'rgba(255,255,255,0.2)' : 'transparent'}
              compact
            >
              Todos
            </Button>
            <Button 
              mode={filter === 'available' ? 'contained' : 'text'}
              onPress={() => setFilter('available')}
              textColor="white"
              buttonColor={filter === 'available' ? 'rgba(255,255,255,0.2)' : 'transparent'}
              compact
            >
              Disponíveis
            </Button>
            <Button 
              mode={filter === 'recruited' ? 'contained' : 'text'}
              onPress={() => setFilter('recruited')}
              textColor="white"
              buttonColor={filter === 'recruited' ? 'rgba(255,255,255,0.2)' : 'transparent'}
              compact
            >
              Recrutados
            </Button>
          </View>
        </View>
        
        {/* Lista de personagens com filtros simples */}
        <ScrollView style={styles.content}>
          {characters
            .filter(character => {
              if (filter === 'all') return true;
              if (filter === 'recruited') return character.isRecruited;
              if (filter === 'available') return !character.isRecruited;
              return true;
            })
            .filter(character => {
              if (!classFilter) return true;
              return character.class === classFilter;
            })
            .map((character) => (
            <Card key={character.id} style={styles.characterCard}>
              <Card.Content>
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.characterClass}>{character.class} - Nível {character.level}</Text>
                <Text style={styles.characterStats}>❤️ {character.health} | ⚡ {character.mana}</Text>
              </Card.Content>
              <Card.Actions>
                <Button 
                  mode={character.isRecruited ? "outlined" : "contained"}
                  onPress={() => {
                    console.log('� Recrutando/dispensando:', character.name);
                    setCharacters(chars => 
                      chars.map(c => 
                        c.id === character.id 
                          ? { ...c, isRecruited: !c.isRecruited }
                          : c
                      )
                    );
                  }}
                >
                  {character.isRecruited ? '🚪 Dispensar' : '⚔️ Recrutar'}
                </Button>
              </Card.Actions>
            </Card>
          ))}
          
          <Button 
            mode="contained" 
            onPress={() => {
              console.log('🎯 Adicionando novo personagem...');
              
              // Arrays para gerar personagens aleatórios
              const nomes = ['Thorin', 'Elara', 'Gareth', 'Luna', 'Kael', 'Zara', 'Darius', 'Mira', 'Vex', 'Nova'];
              const classes = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Paladino', 'Anão'];
              
              const randomNome = nomes[Math.floor(Math.random() * nomes.length)];
              const randomClasse = classes[Math.floor(Math.random() * classes.length)];
              const randomLevel = Math.floor(Math.random() * 5) + 1; // Nível 1-5
              
              const newChar = {
                id: Date.now(),
                name: randomNome,
                class: randomClasse,
                level: randomLevel,
                health: 80 + (randomLevel * 20), // Vida baseada no nível
                mana: 40 + (randomLevel * 15),   // Mana baseada no nível
                isRecruited: false
              };
              
              console.log('✨ Novo personagem criado:', newChar);
              setCharacters(prev => [...prev, newChar]);
            }}
            style={styles.addButton}
          >
            ✨ Novo Herói
          </Button>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6200ee',
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e1bee7',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  characterCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  characterClass: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  characterStats: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});