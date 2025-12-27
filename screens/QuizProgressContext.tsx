// QuizProgressContext.tsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuizProgressItem = {
  score: number;       // 0–1
  attempts?: number;   // how many times taken
  lastTaken?: string;  // timestamp
};

type QuizProgress = {
  [key: string]: QuizProgressItem;
};

type QuizProgressContextType = {
  quizProgress: QuizProgress;
  setQuizProgress: (quizId: string, score: number) => void;
};

export const QuizProgressContext = createContext<QuizProgressContextType>({
  quizProgress: {},
  setQuizProgress: () => {},
});

const STORAGE_KEY = "QUIZ_PROGRESS";

export const QuizProgressProvider = ({ children }: any) => {
  const [quizProgress, setQuizProgressState] = useState<QuizProgress>({});

  // Load progress from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setQuizProgressState(JSON.parse(json));
        }
      } catch (err) {
        console.log("Failed to load quiz progress:", err);
      }
    })();
  }, []);

  const setQuizProgress = async (quizId: string, score: number) => {
    setQuizProgressState((prev) => {
      const prevItem = prev[quizId] || { score: 0, attempts: 0 };
      const newItem: QuizProgressItem = {
        score,
        attempts: (prevItem.attempts || 0) + 1,
        lastTaken: new Date().toISOString(),
      };
      const updated = { ...prev, [quizId]: newItem };

      // Save to AsyncStorage
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch((err) =>
        console.log("Failed to save quiz progress:", err)
      );

      return updated;
    });
  };

  return (
    <QuizProgressContext.Provider value={{ quizProgress, setQuizProgress }}>
      {children}
    </QuizProgressContext.Provider>
  );
};
