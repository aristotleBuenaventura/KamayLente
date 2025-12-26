import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProgressMap = Record<string, number>;

interface ProgressContextProps {
  progress: ProgressMap;
  updateProgress: (moduleId: string, value: number) => void;
  completedModules: number;
  overallProgress: number; // 0–100
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: {},
  updateProgress: () => {},
  completedModules: 0,
  overallProgress: 0,
});

const STORAGE_KEY = 'progress';

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressMap>({});

  /** Load saved progress */
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved) setProgress(JSON.parse(saved));
      })
      .catch((err) => console.log('Error loading progress:', err));
  }, []);

  /** Save progress */
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch((err) =>
      console.log('Error saving progress:', err)
    );
  }, [progress]);

  /** Update any module */
  const updateProgress = (moduleId: string, value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setProgress((prev) => ({
      ...prev,
      [moduleId]: clamped,
    }));
  };

  const completedModules = Object.values(progress).filter(
    (value) => value >= 1
  ).length;

  const overallProgress = Math.round(
    (Object.values(progress).reduce((a, b) => a + b, 0) /
      Math.max(Object.keys(progress).length, 1)) *
      100
  );

  const contextValue = useMemo(
    () => ({
      progress,
      updateProgress,
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
