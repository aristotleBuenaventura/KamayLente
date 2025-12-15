// screens/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard({ navigation }: any) {
    const [name, setName] = useState('');

      useEffect(() => {
        const loadName = async () => {
          try {
            const savedName = await AsyncStorage.getItem('name');
            if (savedName) setName(savedName);
          } catch (error) {
            console.log('Error loading name:', error);
          }
        };
        loadName();
      }, []);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcome}>Welcome{ name ? `, ${name}` : '' }!</Text>
        <Text style={styles.subtitle}>Master basic FSL vocabulary.</Text>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <Text style={styles.progressPercent}>0%</Text>
          <Text style={styles.progressModules}>0 of 0 modules completed</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '0%' }]} />
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Modules</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.secondaryButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Learning Tip</Text>
          <Text style={styles.tipText}>
            Practice for 15 minutes daily to build muscle memory and improve retention of sign language.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation UI */}
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
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scrollContent: { padding: 20, paddingBottom: 100, marginTop: 20 }, // added marginTop
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20 },
  progressCard: {
    backgroundColor: '#ECFEFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  progressLabel: { fontSize: 14, color: '#6B7280' },
  progressPercent: { fontSize: 28, fontWeight: 'bold', color: '#14B8A6', marginVertical: 5 },
  progressModules: { fontSize: 12, color: '#6B7280', marginBottom: 10 },
  progressBarBackground: { height: 8, backgroundColor: '#D1FAE5', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#14B8A6', borderRadius: 4 },
  quickStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    backgroundColor: '#F0FDF4',
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#14B8A6' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  actions: { marginBottom: 20 },
  primaryButton: { backgroundColor: '#FBBF24', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { borderColor: '#FBBF24', borderWidth: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#FBBF24', fontSize: 16, fontWeight: 'bold' },
  tipCard: { backgroundColor: '#FEF3C7', padding: 16, borderRadius: 12 },
  tipTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  tipText: { fontSize: 12, color: '#78350F' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 5,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 15, color: '#6B7280' },
});
