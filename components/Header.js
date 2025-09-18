import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title, Subtitle, Menu, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ title, subtitle, filter, onFilterChange }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'Todos', icon: 'people' },
    { value: 'recruited', label: 'Recrutados', icon: 'person-add' },
    { value: 'available', label: 'Disponíveis', icon: 'person-outline' },
  ];

  const getCurrentFilterLabel = () => {
    const current = filterOptions.find(option => option.value === filter);
    return current ? current.label : 'Todos';
  };

  const getCurrentFilterIcon = () => {
    const current = filterOptions.find(option => option.value === filter);
    return current ? current.icon : 'people';
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="sports-esports" size={28} color="#fff" style={styles.headerIcon} />
          <View>
            <Title style={styles.title}>{title}</Title>
            <Subtitle style={styles.subtitle}>{subtitle}</Subtitle>
          </View>
        </View>
        
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="contained-tonal"
              onPress={() => setMenuVisible(true)}
              icon={getCurrentFilterIcon()}
              style={styles.filterButton}
              labelStyle={styles.filterButtonText}
            >
              {getCurrentFilterLabel()}
            </Button>
          }
        >
          {filterOptions.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => {
                onFilterChange(option.value);
                setMenuVisible(false);
              }}
              title={option.label}
              leadingIcon={option.icon}
              titleStyle={filter === option.value ? styles.selectedMenuItem : null}
            />
          ))}
        </Menu>
      </Appbar.Header>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="trending-up" size={16} color="#666" />
          <Subtitle style={styles.statText}>Gerencie seus heróis</Subtitle>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6200ee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#e1bee7',
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  selectedMenuItem: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statsContainer: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});

export default Header;
