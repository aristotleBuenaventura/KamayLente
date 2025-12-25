// ProgressContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface ModuleProgress {
  alphabets: number; // 0 to 1
  numbers: number;   // 0 to 1
  numbersUnlocked: boolean;
}

interface ProgressContextProps {
  progress: ModuleProgress;
  setAlphabetsProgress: (value: number) => void;
  setNumbersProgress: (value: number) => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: { alphabets: 0, numbers: 0, numbersUnlocked: false },
  setAlphabetsProgress: () => {},
  setNumbersProgress: () => {},
});

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ModuleProgress>({
    alphabets: 0,
    numbers: 0,
    numbersUnlocked: false,
  });

  const setAlphabetsProgress = (value: number) => {
    const unlocked = value >= 1;
    setProgress((prev) => ({
      ...prev,
      alphabets: value,
      numbersUnlocked: unlocked,
    }));
  };

  const setNumbersProgress = (value: number) => {
    setProgress((prev) => ({ ...prev, numbers: value }));
  };

  return (
    <ProgressContext.Provider
      value={{ progress, setAlphabetsProgress, setNumbersProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
