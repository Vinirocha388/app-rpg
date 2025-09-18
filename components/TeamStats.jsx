import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text, ProgressBar, Caption, Divider, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const TeamStats = ({ characters }) => {
  // Filtra apenas personagens recrutados
  const recruitedCharacters = useMemo(() => 
    characters.filter(char => char.isRecruited), 
    [characters]
  );

  // Calcula estatísticas do time
  const teamStats = useMemo(() => {
    if (recruitedCharacters.length === 0) {
      return null;
    }

    // Estatísticas básicas
    const stats = {
      totalLevel: 0,
      averageLevel: 0,
      totalHealth: 0,
      averageHealth: 0,
      totalMana: 0,
      averageMana: 0,
      classCounts: {},
      highestLevelCharacter: null,
      mostPowerfulCharacter: null,
    };

    // Calcula estatísticas
    recruitedCharacters.forEach(char => {
      // Somas
      stats.totalLevel += char.level;
      stats.totalHealth += char.health;
      stats.totalMana += char.mana;
      
      // Contagem de classes
      stats.classCounts[char.class] = (stats.classCounts[char.class] || 0) + 1;
      
      // Personagem de maior nível
      if (!stats.highestLevelCharacter || char.level > stats.highestLevelCharacter.level) {
        stats.highestLevelCharacter = char;
      }
      
      // Personagem mais poderoso (baseado em HP + Mana)
      const power = char.health + char.mana;
      if (!stats.mostPowerfulCharacter || 
          power > (stats.mostPowerfulCharacter.health + stats.mostPowerfulCharacter.mana)) {
        stats.mostPowerfulCharacter = char;
      }
    });

    // Médias
    stats.averageLevel = stats.totalLevel / recruitedCharacters.length;
    stats.averageHealth = stats.totalHealth / recruitedCharacters.length;
    stats.averageMana = stats.totalMana / recruitedCharacters.length;

    // Encontra a classe predominante
    let mostCommonClass = null;
    let highestCount = 0;
    
    Object.entries(stats.classCounts).forEach(([className, count]) => {
      if (count > highestCount) {
        mostCommonClass = className;
        highestCount = count;
      }
    });
    
    stats.predominantClass = mostCommonClass;
    stats.classBalance = Object.keys(stats.classCounts).length / 8; // 8 é o número total de classes

    return stats;
  }, [recruitedCharacters]);

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

  // Sem personagens recrutados
  if (!teamStats) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.emptyState}>
            <MaterialIcons name="group" size={48} color="#ccc" />
            <Title style={styles.emptyTitle}>Nenhum herói recrutado</Title>
            <Text style={styles.emptyText}>
              Recrute personagens para ver as estatísticas do seu time!
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <MaterialIcons name="analytics" size={24} color="#6200ee" />
          <Title style={styles.title}>Estatísticas do Time</Title>
        </View>

        <Divider style={styles.divider} />
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Caption style={styles.statCaption}>Time Level</Caption>
            <Text style={styles.statValue}>{teamStats.totalLevel}</Text>
            <Caption>Média: {teamStats.averageLevel.toFixed(1)}</Caption>
          </View>
          
          <View style={styles.statItem}>
            <Caption style={styles.statCaption}>Total HP</Caption>
            <Text style={styles.statValue}>{teamStats.totalHealth}</Text>
            <ProgressBar progress={Math.min(teamStats.totalHealth/1000, 1)} color="#e74c3c" style={styles.progressBar} />
          </View>
          
          <View style={styles.statItem}>
            <Caption style={styles.statCaption}>Total Mana</Caption>
            <Text style={styles.statValue}>{teamStats.totalMana}</Text>
            <ProgressBar progress={Math.min(teamStats.totalMana/1000, 1)} color="#3498db" style={styles.progressBar} />
          </View>
        </View>

        <Divider style={styles.divider} />
        
        <View style={styles.classDistribution}>
          <Caption style={styles.sectionTitle}>Distribuição de Classes</Caption>
          <View style={styles.classChips}>
            {Object.entries(teamStats.classCounts).map(([className, count]) => (
              <Chip 
                key={className}
                style={[styles.classChip, {backgroundColor: getClassColor(className)}]}
                textStyle={styles.classChipText}
              >
                {className}: {count}
              </Chip>
            ))}
          </View>
          {teamStats.predominantClass && (
            <Text style={styles.predominantText}>
              Classe predominante: <Text style={{fontWeight: 'bold'}}>{teamStats.predominantClass}</Text>
            </Text>
          )}
        </View>

        <Divider style={styles.divider} />
        
        <View style={styles.highlights}>
          <Caption style={styles.sectionTitle}>Destaques</Caption>
          
          {teamStats.highestLevelCharacter && (
            <View style={styles.highlight}>
              <MaterialIcons name="star" size={20} color="#f1c40f" />
              <Text style={styles.highlightText}>
                <Text style={styles.boldText}>{teamStats.highestLevelCharacter.name}</Text> é o herói de maior nível (Nv. {teamStats.highestLevelCharacter.level})
              </Text>
            </View>
          )}
          
          {teamStats.mostPowerfulCharacter && (
            <View style={styles.highlight}>
              <MaterialIcons name="flash-on" size={20} color="#e67e22" />
              <Text style={styles.highlightText}>
                <Text style={styles.boldText}>{teamStats.mostPowerfulCharacter.name}</Text> é o herói mais poderoso 
                (HP: {teamStats.mostPowerfulCharacter.health}, MP: {teamStats.mostPowerfulCharacter.mana})
              </Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    elevation: 4,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  statCaption: {
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  classDistribution: {
    marginBottom: 10,
  },
  classChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  classChip: {
    margin: 2,
    height: 28,
  },
  classChipText: {
    color: 'white',
    fontSize: 12,
  },
  predominantText: {
    marginTop: 4,
  },
  highlights: {
    marginBottom: 10,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    marginLeft: 6,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    marginTop: 12,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
});

export default TeamStats;
