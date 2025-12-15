// screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('25');

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
          onPress={() => setIsEditing(!isEditing)}
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
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
