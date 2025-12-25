import React, { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModuleProgress {
  alphabets: number; // 0 to 1
  numbers: number;   // 0 to 1
  numbersUnlocked: boolean;
}

interface ProgressContextProps {
  progress: ModuleProgress;
  setAlphabetsProgress: (value: number) => void;
  setNumbersProgress: (value: number) => void;
  totalModules: number;
  completedModules: number;
  overallProgress: number; // 0 to 100
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: { alphabets: 0, numbers: 0, numbersUnlocked: false },
  setAlphabetsProgress: () => {},
  setNumbersProgress: () => {},
  totalModules: 2,
  completedModules: 0,
  overallProgress: 0,
});

const STORAGE_KEY = 'progress';

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ModuleProgress>({
    alphabets: 0,
    numbers: 0,
    numbersUnlocked: false,
  });

  const totalModules = 2;

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: ModuleProgress = JSON.parse(saved);
          setProgress(parsed);
        }
      } catch (err) {
        console.log('Error loading progress:', err);
      }
    };
    loadProgress();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (err) {
        console.log('Error saving progress:', err);
      }
    };
    saveProgress();
  }, [progress]);

  const completedModules =
    (progress.alphabets >= 1 ? 1 : 0) +
    (progress.numbers >= 1 ? 1 : 0);

  const overallProgress = Math.round(
    ((progress.alphabets + progress.numbers) / totalModules) * 100
  );

  const setAlphabetsProgress = (value: number) => {
    const clampedValue = Math.min(1, Math.max(0, value));
    setProgress((prev) => ({
      ...prev,
      alphabets: clampedValue,
      numbersUnlocked: clampedValue >= 1,
    }));
  };

  const setNumbersProgress = (value: number) => {
    const clampedValue = Math.min(1, Math.max(0, value));
    setProgress((prev) => ({ ...prev, numbers: clampedValue }));
  };

  const contextValue = useMemo(
    () => ({
      progress,
      setAlphabetsProgress,
      setNumbersProgress,
      totalModules,
      completedModules,
      overallProgress,
    }),
    [progress]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};
