import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons'; // Expo icons, can be replaced

const SignLearnDashboard = () => {
  const overallProgress = 45;
  const completedModules = 5;
  const totalModules = 12;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back, Alex! 👋</Text>
        <Text style={styles.subtitle}>Master basic ASL vocabulary.</Text>
      </View>

      {/* Progress Card */}
      <View style={styles.card}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Overall Progress</Text>
          <Entypo name="line-graph" size={24} color="#66c2ad" />
        </View>
        <Text style={styles.progressPercent}>{overallProgress}%</Text>
        <Text style={styles.progressModules}>
          {completedModules} of {totalModules} modules completed
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${overallProgress}%` }]} />
        </View>
      </View>

      {/* Modules & Remaining */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedModules}</Text>
          <MaterialIcons name="menu-book" size={24} color="#3fbf9f" />
          <Text style={styles.statLabel}>Modules</Text>
        </View>
        <View style={[styles.statCard, styles.remainingCard]}>
          <Text style={styles.statNumber}>{totalModules - completedModules}</Text>
          <MaterialIcons name="target" size={24} color="#28c76f" />
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <MaterialIcons name="menu-book" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Start Learning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <MaterialIcons name="person-outline" size={20} color="#333" />
          <Text style={styles.secondaryButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Learning Tip */}
      <View style={styles.tipContainer}>
        <MaterialIcons name="lightbulb-outline" size={24} color="#f1c40f" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.tipTitle}>Learning Tip</Text>
          <Text style={styles.tipText}>
            Practice for 15 minutes daily to build muscle memory and improve retention of sign language.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#e6f7f3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3fbf9f',
    marginVertical: 8,
  },
  progressModules: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#cce8e3',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#3fbf9f',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#e6f7f3',
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    alignItems: 'center',
  },
  remainingCard: {
    backgroundColor: '#d4f7e3',
    marginRight: 0,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#3fbf9f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff7e6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
  },
});

export default SignLearnDashboard;
