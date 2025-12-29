// screens/ProfileScreen.tsx
import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ProgressContext } from './ProgressContext';
import { QuizProgressContext } from './QuizProgressContext';
import { QuizModule } from './QuizModule';
import BottomNav from './BottomNav';

export default function ProfileScreen({ navigation }: any) {
  const {
    completedModules,
    totalModules,
    overallProgress,
  } = useContext(ProgressContext);

  const { quizProgress } = useContext(QuizProgressContext);

  /** Quiz completion % */
  const quizStats = useMemo(() => {
    const total = QuizModule.length;
    const passed = QuizModule.filter(
      (q) => quizProgress[q.id]?.score >= 0.7
    ).length;

    const percent = total === 0 ? 0 : Math.round((passed / total) * 100);
    return { passed, total, percent };
  }, [quizProgress]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Text style={{ color: '#fff' }}>✎</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Alex Cruz</Text>

          <View style={styles.badges}>
            <View style={styles.badge}><Text>FSL</Text></View>
            <View style={styles.badgeGray}><Text>Beginner</Text></View>
          </View>
        </View>

        {/* Streak */}
        <View style={styles.card}>
          <Text style={styles.streakTitle}>🔥 7 Day Streak</Text>
          <Text style={styles.subText}>Last practice: Today</Text>
        </View>

        {/* Learning Progress */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <Text style={styles.cardTitle}>Learning Progress</Text>
            <Text style={styles.percent}>{overallProgress}%</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${overallProgress}%` },
              ]}
            />
          </View>

          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statValue}>
                {completedModules}/{totalModules}
              </Text>
              <Text style={styles.subText}>Lessons</Text>
            </View>

            <View>
              <Text style={[styles.statValue, { color: '#16A34A' }]}>
                {quizStats.percent}%
              </Text>
              <Text style={styles.subText}>Quizzes</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <View style={styles.achievementRow}>
            <Achievement label="Beginner" icon="🏆" />
            <Achievement label="Fast Learner" icon="⚡" />
            <Achievement label="Week Streak" icon="📅" />
            <Achievement label="Master" icon="🎓" disabled />
          </View>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}

/* ---------------- COMPONENT ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },

  /* ---------- HEADER ---------- */
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatarWrapper: {
    borderWidth: 3,
    borderColor: '#FACC15',
    borderRadius: 60,
    padding: 5,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FACC15',
    borderRadius: 14,
    padding: 6,
    elevation: 3,
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    color: '#111827',
  },

  badges: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeGray: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  /* ---------- CARD ---------- */
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  streakTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F97316',
  },

  /* ---------- PROGRESS ---------- */
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  percent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
  },

  progressBarBg: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginVertical: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },

  subText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  /* ---------- ACHIEVEMENTS ---------- */
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementIcon: {
    width: 52,
    height: 52,
    backgroundColor: '#FEF3C7',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    elevation: 2,
  },
});

