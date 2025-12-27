// QuizProgressContext.tsx
import React, { createContext, useState } from "react";

type QuizProgressItem = {
  score: number; // 0–1
  attempts?: number; // optional, how many times taken
  lastTaken?: string; // optional, timestamp
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

export const QuizProgressProvider = ({ children }: any) => {
  const [quizProgress, setQuizProgressState] = useState<QuizProgress>({});

  const setQuizProgress = (quizId: string, score: number) => {
    setQuizProgressState((prev) => {
      const prevItem = prev[quizId] || { score: 0, attempts: 0 };
      return {
        ...prev,
        [quizId]: {
          score,
          attempts: prevItem.attempts! + 1,
          lastTaken: new Date().toISOString(),
        },
      };
    });
  };

  return (
    <QuizProgressContext.Provider value={{ quizProgress, setQuizProgress }}>
      {children}
    </QuizProgressContext.Provider>
  );
};
