// screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedAge = await AsyncStorage.getItem('age');
        if (savedName) setName(savedName);
        if (savedAge) setAge(savedAge);
      } catch (error) {
        console.log('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('age', age);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.log('Error saving data', error);
    }
  };

  // Toggle edit/save
  const handleEditSave = () => {
    if (isEditing) {
      saveData(); // Save on 'Save'
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity style={styles.imageContainer} onPress={() => alert('Pick a new profile image')}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        ) : (
          <Text style={styles.info}>{name}</Text>
        )}

        {/* Age */}
        <Text style={styles.label}>Age</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.info}>{age}</Text>
        )}

        {/* Edit/Save Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditSave}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBEA' },
  scrollContent: { padding: 20, paddingBottom: 120, marginTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', alignSelf: 'center', marginBottom: 20 },

  imageContainer: {
    marginVertical: 20,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FBBF24',
    alignSelf: 'center',
  },
  image: { width: 150, height: 150 },

  label: { fontSize: 14, color: '#6B7280', marginTop: 10 },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 10,
  },

  editButton: {
    marginTop: 30,
    backgroundColor: '#FBBF24',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 5,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFBEA',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
