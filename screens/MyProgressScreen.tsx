import React, { useContext } from 'react';
import {LearningModule} from './LearningModule';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { ProgressContext } from './ProgressContext';
import BottomNav from './BottomNav';

export default function MyProgressScreen({ navigation }: any) {
  const { progress } = useContext(ProgressContext);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.modulesContainer}>
        {LearningModule.map((module) => {
          const progressValue = progress[module.id] || 0;

          const unlocked =
            !module.unlockAfter ||
            (progress[module.unlockAfter] || 0) >= 1;

          return (
            <View
              key={module.id}
              style={[
                styles.moduleCard,
                unlocked ? styles.activeModule : styles.lockedModule,
              ]}
            >
              <Image source={module.image} style={styles.moduleImage} />

              <View style={styles.moduleTextContainer}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>
                  {module.description}
                </Text>

                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressValue * 100}%` },
                    ]}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                disabled={!unlocked}
                onPress={() =>
                  unlocked &&
                  navigation.navigate('Lesson', { module })
                }
              >
                <Text style={styles.actionButtonText}>
                  {unlocked ? '▶' : '🔒'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
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

