import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const modulesData = [
  {
    title: 'Alphabets',
    description: 'Foundational handshapes.',
    lessonProgress: '12 of 26',
    progressPercent: 0.46,
    active: true,
    image: require('./alphabets/Alphabets/A.png'),
  },
  {
    title: 'Numbers',
    description: 'Counting 1-100.',
    lessonProgress: '0 of 26',
    progressPercent: 0,
    active: false,
    image: require('./alphabets/Alphabets/A.png'),
  },
];

export default function MyProgressScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Progress</Text>
      </View>

      {/* Modules */}
      <ScrollView contentContainerStyle={styles.modulesContainer}>
        {modulesData.map((module, index) => (
          <View
            key={index}
            style={[
              styles.moduleCard,
              module.active ? styles.activeModule : styles.lockedModule,
            ]}
          >
            <Image source={module.image} style={styles.moduleImage} />
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
              <Text style={styles.moduleLesson}>{module.lessonProgress}</Text>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${module.progressPercent * 100}%` },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                {module.active ? '▶' : '🔒'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA', // light cream background
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#333', // dark text for visibility
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modulesContainer: {
    paddingHorizontal: 20,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },
  activeModule: {
    backgroundColor: '#FFF3C4', // slightly darker cream
  },
  lockedModule: {
    backgroundColor: '#FFF3C4',
    opacity: 0.6,
  },
  moduleImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  moduleDescription: {
    color: '#666',
    fontSize: 14,
    marginVertical: 4,
  },
  moduleLesson: {
    color: '#999',
    fontSize: 12,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0D7A7',
    borderRadius: 3,
    marginTop: 5,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#F5A623', // golden progress fill
    borderRadius: 3,
  },
  actionButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#F5A623',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
