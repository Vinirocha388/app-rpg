import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  console.log('🔍 App SUPER SIMPLES carregando...');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 TESTE - SE VOCÊ VÊ ISSO, FUNCIONA!</Text>
      <Text style={styles.subtitle}>A vaca voltou para o pasto! 🐄</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
});
