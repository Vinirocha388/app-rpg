import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  console.log('App simples carregando...');

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>🎮 RPG Manager</Text>
        <Text style={styles.subtitle}>Aplicação funcionando!</Text>
        <Button mode="contained" onPress={() => alert('Funcionou!')}>
          Testar
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});
