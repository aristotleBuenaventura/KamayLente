import { alphabetData } from './alphabet';
import { numberData } from './numbers';

import alphabetImage from './Images/A.png';
import numbersImage from './Images/12.png';

export const LearningModule = [
{
id: 'alphabets',
title: 'Alphabets',
description: 'Letters from A to Z.',
data: alphabetData,
image: alphabetImage,
unlockAfter: null,
},
{
id: 'numbers',
title: 'Numbers',
description: 'Counting Numbers from 0 to 9.',
data: numberData,
image: numbersImage,
unlockAfter: 'alphabets',
},
{
id: 'test2',
title: 'test',
description: 'test.',
data: numberData,
image: numbersImage,
unlockAfter: 'numbers',
},
];
