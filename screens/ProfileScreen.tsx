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

const Achievement = ({ icon, label, disabled = false }: any) => (
  <View style={{ alignItems: 'center', opacity: disabled ? 0.3 : 1 }}>
    <View style={styles.achievementIcon}>
      <Text style={{ fontSize: 18 }}>{icon}</Text>
    </View>
    <Text style={styles.subText}>{label}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBEA' },
  content: { padding: 20, paddingBottom: 120 },

  header: { alignItems: 'center', marginBottom: 20 },

  avatarWrapper: {
    borderWidth: 3,
    borderColor: '#FBBF24',
    borderRadius: 60,
    padding: 4,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FBBF24',
    borderRadius: 12,
    padding: 4,
  },

  name: { fontSize: 22, fontWeight: '700', marginTop: 10 },

  badges: { flexDirection: 'row', gap: 8, marginTop: 8 },
  badge: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeGray: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  card: {
    backgroundColor: '#FFF3C4',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  streakTitle: { fontSize: 18, fontWeight: '700' },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  percent: { fontSize: 16, fontWeight: '700', color: '#F59E0B' },

  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginVertical: 10,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statValue: { fontSize: 18, fontWeight: '700' },
  subText: { fontSize: 12, color: '#6B7280' },

  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementIcon: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
});
