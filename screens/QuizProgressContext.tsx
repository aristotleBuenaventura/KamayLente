import React, { createContext, useState } from "react";

type QuizProgress = {
  [key: string]: number; // 0–1 (percentage)
};

type QuizProgressContextType = {
  quizProgress: QuizProgress;
  setQuizProgress: (quizId: string, value: number) => void;
};

export const QuizProgressContext = createContext<QuizProgressContextType>({
  quizProgress: {},
  setQuizProgress: () => {},
});

export const QuizProgressProvider = ({ children }: any) => {
  const [quizProgress, setQuizProgressState] = useState<QuizProgress>({});

  const setQuizProgress = (quizId: string, value: number) => {
    setQuizProgressState((prev) => ({
      ...prev,
      [quizId]: value,
    }));
  };

  return (
    <QuizProgressContext.Provider value={{ quizProgress, setQuizProgress }}>
      {children}
    </QuizProgressContext.Provider>
  );
};
