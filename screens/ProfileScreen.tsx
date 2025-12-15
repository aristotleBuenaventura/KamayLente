// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <Text style={styles.info}>John Doe</Text>

      {/* Age */}
      <Text style={styles.label}>Age</Text>
      <Text style={styles.info}>25</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navText}>Home</Text>
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
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, color: '#333', alignSelf: 'center' },
  imageContainer: {
    marginVertical: 20,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4a90e2',
    alignSelf: 'center',
  },
  image: { width: 150, height: 150 },
  label: { fontSize: 16, color: '#888', marginTop: 10 },
  info: { fontSize: 20, fontWeight: '500', color: '#333', marginBottom: 10 },
  editButton: {
    marginTop: 30,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignSelf: 'center',
  },
  editButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
