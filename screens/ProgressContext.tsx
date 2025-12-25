import React, { createContext, useState, ReactNode, useMemo } from 'react';

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

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ModuleProgress>({
    alphabets: 0,
    numbers: 0,
    numbersUnlocked: false,
  });

  const totalModules = 2;

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
