import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const CharacterCard = ({ character, onRemove, onRecruit }) => {
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

  const getClassIcon = (characterClass) => {
    const icons = {
      'Guerreiro': 'sports-handball',
      'Mago': 'auto-fix-high',
      'Arqueiro': 'my-location',
      'Anão': 'construction',
      'Paladino': 'shield',
      'Ladino': 'visibility-off',
      'Bárbaro': 'fitness-center',
      'Clérigo': 'healing',
    };
    return icons[characterClass] || 'person';
  };

  return (
    <Card style={[styles.card, character.isRecruited && styles.recruitedCard]}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MaterialIcons 
              name={getClassIcon(character.class)} 
              size={24} 
              color={getClassColor(character.class)}
              style={styles.classIcon}
            />
            <Title style={styles.name}>{character.name}</Title>
            {character.isRecruited && (
              <Chip 
                icon="check" 
                mode="flat" 
                style={styles.recruitedChip}
                textStyle={styles.recruitedChipText}
              >
                Recrutado
              </Chip>
            )}
          </View>
          
          <IconButton
            icon="delete"
            iconColor="#e74c3c"
            size={20}
            onPress={() => onRemove(character)}
          />
        </View>

        <View style={styles.info}>
          <View style={styles.classContainer}>
            <Chip 
              icon={getClassIcon(character.class)}
              style={[styles.classChip, { backgroundColor: getClassColor(character.class) }]}
              textStyle={styles.classChipText}
            >
              {character.class}
            </Chip>
            <Paragraph style={styles.level}>Nível {character.level}</Paragraph>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <MaterialIcons name="favorite" size={16} color="#e74c3c" />
              <Paragraph style={styles.statText}>{character.health} HP</Paragraph>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="auto-fix-high" size={16} color="#3498db" />
              <Paragraph style={styles.statText}>{character.mana} MP</Paragraph>
            </View>
          </View>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button 
          mode={character.isRecruited ? "outlined" : "contained"}
          onPress={() => onRecruit(character)}
          icon={character.isRecruited ? "account-minus" : "account-plus"}
          style={character.isRecruited ? styles.desertButton : styles.recruitButton}
        >
          {character.isRecruited ? 'Desertar' : 'Recrutar'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  recruitedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  classIcon: {
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  recruitedChip: {
    backgroundColor: '#d4edda',
    marginLeft: 'auto',
  },
  recruitedChipText: {
    color: '#155724',
    fontSize: 12,
  },
  info: {
    marginBottom: 12,
  },
  classContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classChip: {
    marginRight: 12,
  },
  classChipText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  level: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  recruitButton: {
    backgroundColor: '#27ae60',
  },
  desertButton: {
    borderColor: '#e74c3c',
  },
});

export default CharacterCard;
