import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BottomNav({ navigation }: any) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Alphabets')}
      >
        <Text style={styles.navText}>Learn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFBEA',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
