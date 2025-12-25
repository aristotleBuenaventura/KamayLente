// ProgressContext.tsx
import React, { createContext, useState, ReactNode, useMemo } from 'react';

interface ModuleProgress {
  alphabets: number; // 0 to 1
  numbers: number;   // 0 to 1
}

interface ProgressContextProps {
  progress: ModuleProgress;
  numbersUnlocked: boolean;
  completedModules: number;
  totalModules: number;
  overallProgress: number;
  setAlphabetsProgress: (value: number) => void;
  setNumbersProgress: (value: number) => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: { alphabets: 0, numbers: 0 },
  numbersUnlocked: false,
  completedModules: 0,
  totalModules: 2,
  overallProgress: 0,
  setAlphabetsProgress: () => {},
  setNumbersProgress: () => {},
});

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ModuleProgress>({
    alphabets: 0,
    numbers: 0,
  });

  const totalModules = 2;

  const numbersUnlocked = progress.alphabets >= 1;

  const completedModules =
    (progress.alphabets >= 1 ? 1 : 0) +
    (progress.numbers >= 1 ? 1 : 0);

  const overallProgress = Math.round(
    ((progress.alphabets + progress.numbers) / totalModules) * 100
  );

  const setAlphabetsProgress = (value: number) => {
    setProgress((prev) => ({
      ...prev,
      alphabets: Math.min(1, Math.max(0, value)),
    }));
  };

  const setNumbersProgress = (value: number) => {
    setProgress((prev) => ({
      ...prev,
      numbers: Math.min(1, Math.max(0, value)),
    }));
  };

  const contextValue = useMemo(
    () => ({
      progress,
      numbersUnlocked,
      completedModules,
      totalModules,
      overallProgress,
      setAlphabetsProgress,
      setNumbersProgress,
    }),
    [progress, numbersUnlocked, completedModules, overallProgress]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};
