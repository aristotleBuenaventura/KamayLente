import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressContext } from './ProgressContext';
import alphabetImage from './Images/A.png';
import numbersImage from './Images/12.png';
import BottomNav from './BottomNav';

export default function MyProgressScreen({ navigation }: any) {
  const { progress } = useContext(ProgressContext);
  const [loading, setLoading] = useState(true);

  // Wait a short moment for AsyncStorage to load
  useEffect(() => {
    setLoading(false);
  }, [progress]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  const modulesData = [
    {
      title: 'Alphabets',
      description: 'Letters from A to Z.',
      progressPercent: progress.alphabets || 0,
      active: true,
      image: alphabetImage,
    },
    {
      title: 'Numbers',
      description: 'Counting Numbers from 0 to 9.',
      progressPercent: progress.numbers || 0,
      active: progress.numbersUnlocked,
      image: numbersImage,
    },
  ];

  return (
    <View style={styles.container}>
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
              <View style={styles.progressBarBackground}>
                <View
                  style={[styles.progressBarFill, { width: `${module.progressPercent * 100}%` }]}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              disabled={!module.active}
              onPress={() =>
                module.active &&
                navigation.navigate(module.title === 'Alphabets' ? 'Alphabets' : 'Numbers')
              }
            >
              <Text style={styles.actionButtonText}>{module.active ? '▶' : '🔒'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    paddingTop: 50,
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
    backgroundColor: '#FFF3C4',
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
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0D7A7',
    borderRadius: 3,
    marginTop: 5,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#F5A623',
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
