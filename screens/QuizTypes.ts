// QuizTypes.ts

export interface QuizChoice {
    id: string;
label: string;
}

export interface QuizQuestion {
id: number;
image: any;
choices: QuizChoice[];
correctChoiceId: string;
}

export interface QuizConfig {
title?: string;
questions: QuizQuestion[];
}
