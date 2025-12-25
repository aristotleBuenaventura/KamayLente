import { QuizConfig } from "./QuizTypes";

export const alphabetQuiz: QuizConfig = {
title: "Sign Language Alphabet",
questions: [
{
id: 1,
image: require("./alphabets/Alphabets/A.png"),
      choices: [
        { id: "A", label: "A" },
        { id: "B", label: "B" },
        { id: "C", label: "C" },
      ],
      correctChoiceId: "A",
    },
    {
      id: 2,
      image: require("./alphabets/Alphabets/B.png"),
      choices: [
        { id: "A", label: "A" },
        { id: "B", label: "B" },
        { id: "C", label: "C" },
      ],
      correctChoiceId: "B",
    },
  ],
};
