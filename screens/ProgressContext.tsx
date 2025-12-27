import React, { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProgressMap = Record<string, number>;

interface ProgressContextProps {
  progress: ProgressMap;
  updateProgress: (moduleId: string, value: number) => void;
  completedModules: number;
  totalModules: number;
  overallProgress: number; // 0–100
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: {},
  updateProgress: () => {},
  completedModules: 0,
  totalModules: 0,
  overallProgress: 0,
});

const STORAGE_KEY = 'progress';

// Only your real modules
const MODULES = ['alphabets', 'numbers'];

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressMap>({});

  /** Load saved progress */
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved) {
          const parsed: ProgressMap = JSON.parse(saved);

          // Remove any keys not in MODULES
          const filtered: ProgressMap = {};
          MODULES.forEach((id) => {
            filtered[id] = parsed[id] || 0;
          });

          setProgress(filtered);
        }
      })
      .catch((err) => console.log('Error loading progress:', err));
  }, []);

  /** Save progress */
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch((err) =>
      console.log('Error saving progress:', err)
    );
  }, [progress]);

  /** Update progress for a module */
  const updateProgress = (moduleId: string, value: number) => {
    if (!MODULES.includes(moduleId)) return;
    const clamped = Math.min(1, Math.max(0, value));
    setProgress((prev) => ({ ...prev, [moduleId]: clamped }));
  };

  /** Calculate progress based only on MODULES */
  const completedModules = MODULES.filter((id) => (progress[id] || 0) >= 1).length;
  const totalModules = MODULES.length;
  const overallProgress = Math.round(
    (MODULES.reduce((sum, id) => sum + (progress[id] || 0), 0) / totalModules) * 100
  );

  const contextValue = useMemo(
    () => ({ progress, updateProgress, completedModules, totalModules, overallProgress }),
    [progress]
  );

  return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
};
