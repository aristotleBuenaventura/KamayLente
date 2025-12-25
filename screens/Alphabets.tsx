import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { alphabetData } from './alphabet';
import { ProgressContext } from './ProgressContext';
import BottomNav from './BottomNav';

const TOTAL_LESSONS = 26;
const STORAGE_KEY = 'alphabetsProgress';

export default function Alphabet({ navigation }: any) {
  const { progress, setAlphabetsProgress } = useContext(ProgressContext);

  // Initialize index from saved progress or context
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        let savedProgress = saved ? parseFloat(saved) : progress.alphabets;
        const lastLessonIndex = Math.floor(savedProgress * TOTAL_LESSONS);
        setIndex(lastLessonIndex < TOTAL_LESSONS ? lastLessonIndex : TOTAL_LESSONS - 1);
        setAlphabetsProgress(savedProgress);
      } catch (err) {
        console.log('Error loading saved progress:', err);
      }
    };
    loadProgress();
  }, []);

  const item = alphabetData[index];

  // Ensure last lesson sets exact 1.0 progress to unlock Numbers
  const currentProgress =
    index === TOTAL_LESSONS - 1 ? 1 : (index + 1) / TOTAL_LESSONS;

  // Update global context and save to AsyncStorage whenever progress changes
  useEffect(() => {
    setAlphabetsProgress(currentProgress);
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, currentProgress.toString());
      } catch (err) {
        console.log('Error saving progress:', err);
      }
    };
    saveProgress();
  }, [index]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, styles.boxContainer]}>
        <Text style={styles.title}>Alphabets</Text>
        <View style={styles.progressRow}>
          <Text style={styles.lessonText}>
            Lesson {index + 1} of {TOTAL_LESSONS}
          </Text>
          <Text style={styles.percentText}>{Math.round(currentProgress * 100)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${currentProgress * 100}%` }]} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageCard}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.letterTitle}>Letter {item.letter}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>

      {/* Prev / Next */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.prevButton, index === 0 && styles.disabled]}
          disabled={index === 0}
          onPress={() => setIndex(index - 1)}
        >
          <Text style={styles.prevText}>← Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, index === TOTAL_LESSONS - 1 && styles.disabled]}
          disabled={index === TOTAL_LESSONS - 1}
          onPress={() => setIndex(index + 1)}
        >
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
  },

boxContainer:{
    marginTop: 30,
    },

  header: {
    padding: 20,
  },

  title: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  lessonText: {
    color: '#6B7280',
    fontSize: 14,
  },

  percentText: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '600',
  },

  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FBBF24',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  imageCard: {
    backgroundColor: '#D1FAE5',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  letterTitle: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },

  description: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 22,
  },

  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  prevButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  nextButton: {
    backgroundColor: '#FBBF24',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },

  prevText: {
    color: '#111827',
    fontSize: 16,
  },

  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  disabled: {
    opacity: 0.4,
  },
});

