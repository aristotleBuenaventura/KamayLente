// screens/ProfileScreen.tsx
import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProgressContext } from './ProgressContext';
import { QuizProgressContext } from './QuizProgressContext';
import { QuizModule } from './QuizModule';
import BottomNav from './BottomNav';

const STORAGE_KEY = 'USER_PROFILE';

export default function ProfileScreen({ navigation }: any) {
  const { completedModules, totalModules, overallProgress } =
    useContext(ProgressContext);

  const { quizProgress } = useContext(QuizProgressContext);

  /* ---------------- STATE ---------------- */
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Alex Cruz');
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150');
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.name) setName(parsed.name);
          if (parsed.avatar) setAvatar(parsed.avatar);
        }
      } catch (e) {
        console.log('Failed to load profile', e);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ---------------- SAVE PROFILE ---------------- */
  const saveProfile = async () => {
    try {
      const data = { name, avatar };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setIsEditing(false);
    } catch (e) {
      console.log('Failed to save profile', e);
    }
  };

  /* ---------------- IMAGE PICKER ---------------- */
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          setAvatar(response.assets[0].uri!);
        }
      }
    );
  };

  /* ---------------- QUIZ STATS ---------------- */
  const quizStats = useMemo(() => {
    const total = QuizModule.length;
    const passed = QuizModule.filter(
      (q) => quizProgress[q.id]?.score >= 0.7
    ).length;

    const percent = total === 0 ? 0 : Math.round((passed / total) * 100);
    return { passed, total, percent };
  }, [quizProgress]);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* ---------------- PROFILE HEADER ---------------- */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatar }} style={styles.avatar} />

            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                if (!isEditing) {
                  setIsEditing(true);
                } else {
                  pickImage();
                }
              }}
            >
              <Text style={{ color: '#fff' }}>
                {isEditing ? '🖼' : '✎'}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.nameInput}
              autoFocus
            />
          ) : (
            <Text style={styles.name}>{name}</Text>
          )}

          {isEditing && (
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveProfile}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          )}

          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text>FSL</Text>
            </View>
            <View style={styles.badgeGray}>
              <Text>Beginner</Text>
            </View>
          </View>
        </View>

        {/* ---------------- STREAK ---------------- */}
        <View style={styles.card}>
          <Text style={styles.streakTitle}>🔥 7 Day Streak</Text>
          <Text style={styles.subText}>Last practice: Today</Text>
        </View>

        {/* ---------------- PROGRESS ---------------- */}
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

        {/* ---------------- ACHIEVEMENTS ---------------- */}
        <View style={styles.card}>
          <View style={styles.achievementRow}>
            <Achievement icon="🏆" label="Beginner" />
            <Achievement icon="⚡" label="Fast Learner" />
            <Achievement icon="📅" label="Week Streak" />
            <Achievement icon="🎓" label="Master" disabled />
          </View>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}

/* ---------------- ACHIEVEMENT ---------------- */

const Achievement = ({
  icon,
  label,
  disabled = false,
}: {
  icon: string;
  label: string;
  disabled?: boolean;
}) => (
  <View style={{ alignItems: 'center', opacity: disabled ? 0.35 : 1 }}>
    <View
      style={[
        styles.achievementIcon,
        disabled && { backgroundColor: '#E5E7EB' },
      ]}
    >
      <Text style={{ fontSize: 22 }}>{icon}</Text>
    </View>
    <Text style={styles.subText}>{label}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },

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
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    color: '#111827',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: '#FACC15',
    textAlign: 'center',
    color: '#111827',
  },

  saveBtn: {
    marginTop: 8,
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
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

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    elevation: 4,
  },

  streakTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F97316',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
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
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },

  subText: {
    fontSize: 12,
    color: '#6B7280',
  },

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
  },
});
