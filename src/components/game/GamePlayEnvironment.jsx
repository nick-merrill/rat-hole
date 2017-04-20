import React from 'react';
// import PropTypes from 'prop-types';
import {FlatButton, LinearProgress, RaisedButton} from 'material-ui';
import {ImageNavigateNext} from 'material-ui/svg-icons'
import _ from 'lodash';

import StorageEngine from '../../lib/StorageEngine';
import Router from '../../lib/Router';
import {getPermittedStudents} from '../../data/students';
import {
  TextToPhotoQuestion,
  PhotoToTextQuestion,
} from './questions';
import GameData from '../../data/GameData';
import LiveGameScore from './small_components/LiveGameScore';
import SuccessPage from './pages/SuccessPage';
import DEBUG from '../../lib/debug';
import StudentProfile from '../StudentProfile';
import muiTheme from '../../styles/muiTheme';
import GameTutorial, {
  storage as tutorialStorage
} from '../../components/game/pages/GameTutorial';

// Storage and its keys
const storage = new StorageEngine('game_play_environment');
const STUDENT_TO_GUESS_ID = 'studentToGuessID';
const QUESTION_TYPE = 'questionType';
const HAS_PLAYED_ALREADY = 'has_played_already';

const QUESTIONS_TO_SHOW_BEFORE_BREAK_IF_FIRST_TIME_PLAYING = 3;
let QUESTIONS_TO_SHOW_BEFORE_BREAK_RANGE = [6, 8];  // 7 is lucky ;)
if (DEBUG) {
  QUESTIONS_TO_SHOW_BEFORE_BREAK_RANGE = [2, 2];
}

const AVAILABLE_QUESTION_COMPONENTS = {
  TextToPhotoQuestion,
  PhotoToTextQuestion,
};

/**
 * Chooses which student to have the user guess and displays a question type
 * of appropriate difficulty for user's ability level.
 *
 * DESIGN:
 *   Takes advantage of the randomness that people find interesting. Randomness
 *   comes in several forms in this game:
 *     1. Which student is presented.
 *     2. How a user is asked to identify each student.
 */
class GamePlayEnvironment extends React.Component {
  constructor(props) {
    super(props);
    const permittedStudents = getPermittedStudents();
    // Looks up student by ID if a student was already being guessed during
    // last game play session.
    const initialStudentToGuess = _.find(permittedStudents, {
      id: storage.get(STUDENT_TO_GUESS_ID),
    });
    const initialQuestionType = storage.get(QUESTION_TYPE);
    let remainingQuestionsCount;
    if (storage.get(HAS_PLAYED_ALREADY)) {
      remainingQuestionsCount = this.getNewRemainingQuestionsCount();
    } else {
      remainingQuestionsCount = QUESTIONS_TO_SHOW_BEFORE_BREAK_IF_FIRST_TIME_PLAYING;
    }
    this.state = {
      students: permittedStudents,
      studentToGuess: initialStudentToGuess,
      questionType: initialQuestionType,
      // This number will count down to 0.
      remainingQuestionsCount,
      // This number will stay constant so we know how far the user has come,
      // for the purpose of measuring progress.
      questionsInRound: remainingQuestionsCount,
    };
  }

  getNewRemainingQuestionsCount() {
    const [min, max] = QUESTIONS_TO_SHOW_BEFORE_BREAK_RANGE;
    return _.random(min, max);
  }

  handleContinue() {
    const remainingQuestionsCount = this.getNewRemainingQuestionsCount();
    this.setState({
      remainingQuestionsCount,
      questionsInRound: remainingQuestionsCount,
      justBadlyGuessedStudent: null,
    });
    this.loadNextQuestion();
  }

  componentWillMount() {
    // Only loads a new student on mount if there wasn't already a student
    // loaded. This prevents a user from cheating by refreshing the app
    // manually.
    this.loadNextQuestion(this.state.studentToGuess);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the state has just reached 0 questions remaining, the user
    // is considered to have played the game once.
    if (this.state.remainingQuestionsCount === 0 && prevState.remainingQuestionsCount > 0) {
      storage.set(HAS_PLAYED_ALREADY, true);
    }
  }

  handleGoodGuess() {
    this.setState({
      remainingQuestionsCount: this.state.remainingQuestionsCount - 1,
    });
    this.loadNextQuestion();
  }

  handleBadGuess() {
    this.setState({
      justBadlyGuessedStudent: this.state.studentToGuess,
    });
  }

  /**
   * Note: A pool is smaller than a universe. Duh!
   */
  loadNextQuestion(forcedStudent = null, forcedQuestionType = null) {
    // Don't let the last two guesses show up as options, unless that student
    // is forced.
    const questionType = (
      forcedQuestionType || _.sample(_.keys(AVAILABLE_QUESTION_COMPONENTS))
    );
    const recentGuesses = GameData.getRecentlyGuessedStudentIDs().slice(0, 2);
    const guessUniverse = _.filter(this.state.students, (s) => {
      return (
        !recentGuesses.includes(s.id)
        || (forcedStudent && forcedStudent.id === s.id)
      );
    });
    const newStudent = forcedStudent || _.sample(guessUniverse);
    // Don't include the same student as the student to be guessed or
    // any students of a different sex than the student to be guessed,
    // lest the game be too easy.
    let guessPool = _.reject(guessUniverse, (s) => {
      return s.id === newStudent.id || s.sex !== newStudent.sex;
    });
    // OPTIMIZE:
    guessPool = _.shuffle(guessPool);
    this.setState({
      studentToGuess: newStudent,
      guessPool,
      questionType,
    });
    storage.set(STUDENT_TO_GUESS_ID, newStudent.id);
    storage.set(QUESTION_TYPE, questionType);
  }

  renderContinueBlock() {
    return (
      <div>
        <p>Are you ready to continue?</p>
        <RaisedButton label='Bring it on' primary={true}
                      icon={<ImageNavigateNext/>}
                      labelPosition='before'
                      labelStyle={{fontSize: 20}}
                      buttonStyle={{
                        height: 60,
                        minWidth: window.innerWidth / 2
                      }}
                      onTouchTap={() => this.handleContinue()} />
      </div>
    );
  }

  render() {
    const isSuccessPage = this.state.remainingQuestionsCount === 0;

    // Note that although this is called a Question, it is a specific subclass
    // of the Question class. It's called Question so that it's easier for an
    // IDE to map the required props onto it.
    const Question = AVAILABLE_QUESTION_COMPONENTS[this.state.questionType];
    const question = () => (
      <Question
        studentToGuess={this.state.studentToGuess}
        guessPool={this.state.guessPool}
        handleGoodGuess={() => this.handleGoodGuess()}
        handleBadGuess={() => this.handleBadGuess()}
        // Have the question element take up as much space as possible.
        style={{flex: '1 1 auto'}}
      />
    );

    /**
     * If this is the first time the user is playing, show the tutorial screen.
     * Otherwise, start the game.
     */
    const userHasSeenTutorial = !!tutorialStorage.get('hasReadTutorial');

    let primaryComponent;
    if (!userHasSeenTutorial) {
      primaryComponent = (
        <GameTutorial handleContinue={() => this.handleContinue()} />
      );
    } else if (isSuccessPage) {
      primaryComponent = (
        <div>
          <SuccessPage
            circleProgressPercent={GameData.getGuessRatio({maxDepth: this.props.questionsInRound}) * 100} />
          {this.renderContinueBlock()}
        </div>
      );
    } else if (this.state.justBadlyGuessedStudent) {
      primaryComponent = (
        <div className='padding'>
          <h1 style={{
            fontWeight: 300,
            color: muiTheme.palette.softTextColor,
          }}>For your edification...</h1>
          <StudentProfile student={this.state.justBadlyGuessedStudent} />
          {this.renderContinueBlock()}
        </div>
      );
    } else {
      primaryComponent = question();
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        minHeight: window.innerHeight - muiTheme.appBar.height,
        backgroundColor: muiTheme.game.canvasColor,
        color: muiTheme.game.textColor,
      }}>
        <LinearProgress
          mode='determinate'
          value={this.state.questionsInRound - this.state.remainingQuestionsCount}
          max={this.state.questionsInRound}
        />

        {primaryComponent}

        <LiveGameScore />

        {/* DESIGN: Escape hatch + Redundancy (to back button in menu bar) */}
        <div className='margin'>
          <FlatButton secondary={true}
                      onClick={() => Router.goToPath('/')}>
            Exit Game
          </FlatButton>
        </div>
      </div>
    );
  }
}

GamePlayEnvironment.propTypes = {};

export default GamePlayEnvironment;
