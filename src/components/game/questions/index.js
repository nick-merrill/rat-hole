/**
 * Chooses what kind of question to ask based on how difficult this particular
 * student was to guess.
 */
import GameData from '../../../data/GameData';
import TextToPhotoOptionQuestion from './TextToPhotoOptionQuestion';
import PhotoToTextOptionQuestion from './PhotoToTextOptionQuestion';
import PhotoToTextTypingQuestion from './PhotoToTextTypingQuestion';
import * as _ from 'lodash';

const easyQuestions = {
  TextToPhotoOptionQuestion,
  PhotoToTextOptionQuestion,
};
let EASY_TO_HARD_CUTOFF = 0.8;
let EASY_TO_HARD_MIN_CORRECT_GUESS_COUNT = 2;
const hardQuestions = {
  PhotoToTextTypingQuestion,
};

export const getValidQuestionTypesForStudentToGuess = (studentToGuess) => {
  const correctnessRatio = GameData.guessRatioForStudent(studentToGuess);
  const correctGuessCount = GameData.correctGuessCountForStudent(studentToGuess);

  // If the guess does not yet exist for this student, then we will show
  // an easy question.
  if (_.isNaN(correctnessRatio)) {
    return easyQuestions;
  }

  // If the guess ratio is low, this student is relatively hard to guess.
  // Also, if the student has not been successfully guessed more than a few
  // times, we don't have enough data to presume how good the user is at
  // guessing the particular student.
  if (correctGuessCount < EASY_TO_HARD_MIN_CORRECT_GUESS_COUNT || correctnessRatio < EASY_TO_HARD_CUTOFF) {
    return easyQuestions;
  } else {
    return hardQuestions;
  }
};

// Object containing all questions is exported as the default.
export default {
  ...easyQuestions,
  ...hardQuestions,
};
