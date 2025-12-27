import { QuizConfig } from "./QuizTypes";

export const numberQuiz: QuizConfig = {
title: "Sign Language Numbers",
questions: [
{
id: 1,
image: require("./numbers/Numbers/0.png"),
      choices: [
        { id: "0", label: "0" },
        { id: "1", label: "1" },
        { id: "2", label: "2" },
        { id: "3", label: "3" },
      ],
      correctChoiceId: "0",
    },
    {
      id: 2,
      image: require("./numbers/Numbers/1.png"),
      choices: [
        { id: "0", label: "0" },
        { id: "1", label: "1" },
        { id: "2", label: "2" },
        { id: "3", label: "3" },
      ],
      correctChoiceId: "1",
    },
    {
      id: 3,
      image: require("./numbers/Numbers/2.png"),
      choices: [
        { id: "1", label: "1" },
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "4", label: "4" },
      ],
      correctChoiceId: "2",
    },
    {
      id: 4,
      image: require("./numbers/Numbers/3.png"),
      choices: [
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "4", label: "4" },
        { id: "5", label: "5" },
      ],
      correctChoiceId: "3",
    },
    {
      id: 5,
      image: require("./numbers/Numbers/4.png"),
      choices: [
        { id: "3", label: "3" },
        { id: "4", label: "4" },
        { id: "5", label: "5" },
        { id: "6", label: "6" },
      ],
      correctChoiceId: "4",
    },
    {
      id: 6,
      image: require("./numbers/Numbers/5.png"),
      choices: [
        { id: "4", label: "4" },
        { id: "5", label: "5" },
        { id: "6", label: "6" },
        { id: "7", label: "7" },
      ],
      correctChoiceId: "5",
    },
    {
      id: 7,
      image: require("./numbers/Numbers/6.png"),
      choices: [
        { id: "5", label: "5" },
        { id: "6", label: "6" },
        { id: "7", label: "7" },
        { id: "8", label: "8" },
      ],
      correctChoiceId: "6",
    },
    {
      id: 8,
      image: require("./numbers/Numbers/7.png"),
      choices: [
        { id: "6", label: "6" },
        { id: "7", label: "7" },
        { id: "8", label: "8" },
        { id: "9", label: "9" },
      ],
      correctChoiceId: "7",
    },
    {
      id: 9,
      image: require("./numbers/Numbers/8.png"),
      choices: [
        { id: "7", label: "7" },
        { id: "8", label: "8" },
        { id: "9", label: "9" },
        { id: "0", label: "0" },
      ],
      correctChoiceId: "8",
    },
    {
      id: 10,
      image: require("./numbers/Numbers/9.png"),
      choices: [
        { id: "8", label: "8" },
        { id: "9", label: "9" },
        { id: "0", label: "0" },
        { id: "1", label: "1" },
      ],
      correctChoiceId: "9",
    },
  ],
};
