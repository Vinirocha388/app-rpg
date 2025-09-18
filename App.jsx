import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text as RNText } from 'react-native';
import { Provider as PaperProvider, Text, Button, ActivityIndicator, Card, Chip, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import TeamStats from './components/TeamStats';
import Header from './components/Header';

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
        
        {/* Header com filtros */}
        <Header 
          title="🎮 RPG Manager" 
          subtitle={`${characters.length} ${characters.length === 1 ? 'herói' : 'heróis'} disponíveis`}
          filter={filter}
          classFilter={classFilter}
          onFilterChange={setFilter}
          onClassFilterChange={setClassFilter}
        />
        
        {/* Lista de personagens moderna */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Chips para mostrar filtros ativos */}
          {(filter !== 'all' || classFilter) && (
            <View style={styles.activeFiltersContainer}>
              <Text style={styles.activeFiltersLabel}>Filtros ativos:</Text>
              <View style={styles.filtersChipContainer}>
                {filter !== 'all' && (
                  <Chip 
                    icon={filter === 'recruited' ? 'person-add' : 'person-outline'} 
                    mode="flat" 
                    onClose={() => setFilter('all')} 
                    style={styles.filterChip}
                  >
                    {filter === 'recruited' ? 'Recrutados' : 'Disponíveis'}
                  </Chip>
                )}
                {classFilter && (
                  <Chip 
                    icon="category" 
                    mode="flat" 
                    onClose={() => setClassFilter(null)} 
                    style={styles.filterChip}
                  >
                    {classFilter}
                  </Chip>
                )}
              </View>
            </View>
          )}
          
          {/* Componente de estatísticas do time */}
          <TeamStats characters={characters} />
          
          {/* Lista filtrada de personagens */}
          {(() => {
            const filteredCharacters = characters
              .filter(character => {
                // Filtro por status de recrutamento
                if (filter === 'all') return true;
                if (filter === 'recruited') return character.isRecruited;
                if (filter === 'available') return !character.isRecruited;
                return true;
              })
              .filter(character => {
                // Filtro por classe
                if (!classFilter) return true;
                return character.class === classFilter;
              });
            
            if (filteredCharacters.length === 0) {
              return (
                <View style={styles.emptyFilterContainer}>
                  <MaterialIcons name="filter-alt-off" size={48} color="#ccc" />
                  <Text style={styles.emptyFilterTitle}>Nenhum herói encontrado</Text>
                  <Text style={styles.emptyFilterText}>
                    Nenhum personagem corresponde aos filtros selecionados.
                  </Text>
                  <Button 
                    mode="outlined" 
                    onPress={() => {setFilter('all'); setClassFilter(null);}}
                    style={{marginTop: 12}}
                  >
                    Limpar filtros
                  </Button>
                </View>
              );
            }
            
            return filteredCharacters.map((character) => (
            <Card key={character.id} style={styles.characterCard} elevation={4}>
              <Card.Content>
                <View style={styles.characterHeader}>
                  <View style={styles.characterInfo}>
                    <Text style={styles.characterName}>{character.name}</Text>
                    <Chip 
                      mode="outlined" 
                      style={[styles.classChip, { backgroundColor: getClassColor(character.class) }]}
                      textStyle={styles.classChipText}
                    >
                      {character.class}
                    </Chip>
                  </View>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Nv. {character.level}</Text>
                  </View>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>❤️</Text>
                    <View style={styles.statInfo}>
                      <Text style={styles.statLabel}>Vida</Text>
                      <Text style={styles.statValue}>{character.health}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⚡</Text>
                    <View style={styles.statInfo}>
                      <Text style={styles.statLabel}>Mana</Text>
                      <Text style={styles.statValue}>{character.mana}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⚔️</Text>
                    <View style={styles.statInfo}>
                      <Text style={styles.statLabel}>Status</Text>
                      <Text style={[styles.statValue, { color: character.isRecruited ? '#4caf50' : '#ff9800' }]}>
                        {character.isRecruited ? 'Ativo' : 'Livre'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
              
              <Card.Actions style={styles.cardActions}>
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
                  buttonColor={character.isRecruited ? 'transparent' : '#6200ee'}
                  textColor={character.isRecruited ? '#6200ee' : 'white'}
                >
                  {character.isRecruited ? '🚪 Dispensar' : '⚔️ Recrutar'}
                </Button>
              </Card.Actions>
            </Card>
          ));
          })()}
        </ScrollView>

        {/* Botão flutuante moderno */}
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
            buttonColor="#6200ee"
            icon="plus"
            contentStyle={styles.addButtonContent}
          >
            ✨ Novo Herói
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

// Função para cores das classes
const getClassColor = (className) => {
  const colors = {
    'Guerreiro': '#ffebee',
    'Mago': '#e8eaf6',
    'Arqueiro': '#e8f5e8',
    'Ladino': '#fce4ec',
    'Paladino': '#fff3e0',
    'Druida': '#f1f8e9',
    'Anão': '#efebe9',
    'Aventureiro': '#f3e5f5'
  };
  return colors[className] || '#f5f5f5';
};

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
    background: 'linear-gradient(135deg, #6200ee 0%, #3700b3 100%)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e1bee7',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 25,
  },
  characterCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  characterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  classChip: {
    alignSelf: 'flex-start',
    borderWidth: 0,
    elevation: 2,
  },
  classChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#424242',
  },
  levelBadge: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    marginVertical: 15,
    backgroundColor: '#e0e0e0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statInfo: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cardActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  activeFiltersContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  activeFiltersLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  filtersChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  emptyFilterContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f9f9f9',
    margin: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  emptyFilterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyFilterText: {
    textAlign: 'center',
    color: '#666',
  },
  recruitButton: {
    flex: 1,
    borderRadius: 12,
    elevation: 2,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  addButton: {
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addButtonContent: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d32f2f',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
});
