import { alphabetQuiz } from './alphabetQuiz';
import { numberQuiz } from './numberQuiz';

import alphabetImage from './alphabets/Alphabets/A.png';
import numberImage from './numbers/Numbers/0.png';

export const QuizModule = [
{
id: 'alphabetQuiz',
title: 'Alphabet Quiz',
description: 'Test your knowledge of the A-Z signs.',
data: alphabetQuiz,
image: alphabetImage,
unlockAfter: null, // or you can require completion of alphabet lessons
},
{
id: 'numberQuiz',
title: 'Numbers Quiz',
description: 'Test your knowledge of 0-9 signs.',
data: numberQuiz,
image: numberImage,
unlockAfter: 'numbers', // optional dependency
},
];
