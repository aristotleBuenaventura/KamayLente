// screens/QuizProgressScreen.tsx
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { QuizProgressContext } from './QuizProgressContext';
import BottomNav from './BottomNav';
import { QuizModule } from './QuizModule';

export default function QuizProgressScreen({ navigation }: any) {
  const { quizProgress } = useContext(QuizProgressContext);

  if (!quizProgress) {
    return (
      <View style={styles.container}>
        <Text>Loading progress...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.modulesContainer}>
        <Text style={styles.sectionTitle}>Quizzes</Text>

        {QuizModule.map((quiz) => {
          const score = quizProgress[quiz.id]?.score || 0;
          const passed = score >= 0.7; // passing threshold
          const attempts = quizProgress[quiz.id]?.attempts || 0;
          const lastTaken = quizProgress[quiz.id]?.lastTaken;
          const unlocked =
            !quiz.unlockAfter || (quizProgress[quiz.unlockAfter]?.score || 0) >= 0.1;

          return (
            <View
              key={quiz.id}
              style={[styles.moduleCard, unlocked ? styles.activeModule : styles.lockedModule]}
            >
              <Image source={quiz.image} style={styles.moduleImage} />
              <View style={styles.moduleTextContainer}>
                <Text style={styles.moduleTitle}>{quiz.title}</Text>
                {quiz.description && (
                  <Text style={styles.moduleDescription}>{quiz.description}</Text>
                )}
                <Text style={styles.scoreText}>
                  Score: {Math.round(score * 100)}% | Attempts: {attempts}
                </Text>
                {lastTaken && (
                  <Text style={styles.lastTakenText}>
                    Last Taken: {new Date(lastTaken).toLocaleDateString()}
                  </Text>
                )}
                {!unlocked && (
                  <Text style={styles.lockedText}>
                    Complete previous quiz to unlock
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                disabled={!unlocked}
                onPress={() => unlocked && navigation.navigate('QuizScreen', { quiz })}
              >
                <Text style={styles.actionButtonText}>{unlocked ? '▶' : '🔒'}</Text>
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
    paddingTop: 10,
    paddingTop: 30,
  },
  modulesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 10,
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
  scoreText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  lastTakenText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  lockedText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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
