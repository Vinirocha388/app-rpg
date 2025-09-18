import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Menu, TouchableRipple, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const AddCharacterForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [level, setLevel] = useState('1');
  const [health, setHealth] = useState('100');
  const [mana, setMana] = useState('50');
  const [menuVisible, setMenuVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const characterClasses = [
    'Guerreiro', 'Mago', 'Arqueiro', 'Anão', 
    'Paladino', 'Ladino', 'Bárbaro', 'Clérigo'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!selectedClass) {
      newErrors.class = 'Classe é obrigatória';
    }

    const levelNum = parseInt(level);
    if (!level || isNaN(levelNum) || levelNum < 1 || levelNum > 100) {
      newErrors.level = 'Nível deve ser entre 1 e 100';
    }

    const healthNum = parseInt(health);
    if (!health || isNaN(healthNum) || healthNum < 1 || healthNum > 1000) {
      newErrors.health = 'Vida deve ser entre 1 e 1000';
    }

    const manaNum = parseInt(mana);
    if (!mana || isNaN(manaNum) || manaNum < 0 || manaNum > 1000) {
      newErrors.mana = 'Mana deve ser entre 0 e 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        class: selectedClass,
        level: parseInt(level),
        health: parseInt(health),
        mana: parseInt(mana),
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setSelectedClass('');
    setLevel('1');
    setHealth('100');
    setMana('50');
    setErrors({});
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
    <View style={styles.container}>
      <TextInput
        label="Nome do Personagem"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        error={!!errors.name}
        left={<TextInput.Icon icon="account" />}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name}
      </HelperText>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableRipple
            onPress={() => setMenuVisible(true)}
            style={[styles.classSelector, errors.class && styles.errorBorder]}
          >
            <View style={styles.classSelectorContent}>
              {selectedClass ? (
                <>
                  <MaterialIcons 
                    name={getClassIcon(selectedClass)} 
                    size={20} 
                    color="#666" 
                    style={styles.classIcon}
                  />
                  <Text style={styles.selectedClassText}>{selectedClass}</Text>
                </>
              ) : (
                <Text style={styles.placeholderText}>Selecionar Classe</Text>
              )}
              <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
            </View>
          </TouchableRipple>
        }
      >
        {characterClasses.map((cls) => (
          <Menu.Item
            key={cls}
            onPress={() => {
              setSelectedClass(cls);
              setMenuVisible(false);
            }}
            title={cls}
            leadingIcon={getClassIcon(cls)}
          />
        ))}
      </Menu>
      <HelperText type="error" visible={!!errors.class}>
        {errors.class}
      </HelperText>

      <View style={styles.row}>
        <TextInput
          label="Nível"
          value={level}
          onChangeText={setLevel}
          mode="outlined"
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          error={!!errors.level}
          left={<TextInput.Icon icon="trending-up" />}
        />
        <TextInput
          label="Vida"
          value={health}
          onChangeText={setHealth}
          mode="outlined"
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          error={!!errors.health}
          left={<TextInput.Icon icon="favorite" />}
        />
      </View>
      <View style={styles.errorRow}>
        <HelperText type="error" visible={!!errors.level} style={styles.smallError}>
          {errors.level}
        </HelperText>
        <HelperText type="error" visible={!!errors.health} style={styles.smallError}>
          {errors.health}
        </HelperText>
      </View>

      <TextInput
        label="Mana"
        value={mana}
        onChangeText={setMana}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        error={!!errors.mana}
        left={<TextInput.Icon icon="auto-fix-high" />}
      />
      <HelperText type="error" visible={!!errors.mana}>
        {errors.mana}
      </HelperText>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onCancel}
          style={styles.button}
        >
          Cancelar
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          icon="plus"
        >
          Adicionar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  input: {
    marginBottom: 4,
  },
  smallInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  errorRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  smallError: {
    flex: 1,
    marginHorizontal: 4,
  },
  classSelector: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginBottom: 4,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  errorBorder: {
    borderColor: '#e74c3c',
  },
  classSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  classIcon: {
    marginRight: 8,
  },
  selectedClassText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default AddCharacterForm;
