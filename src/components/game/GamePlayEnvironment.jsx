import React from 'react';
// import PropTypes from 'prop-types';
import {LinearProgress, RaisedButton} from 'material-ui';
import * as colors from 'material-ui/styles/colors';
import {ImageNavigateNext} from 'material-ui/svg-icons';
import _ from 'lodash';
import $ from 'jquery';

import StorageEngine from '../../lib/StorageEngine';
import Router from '../../lib/Router';
import {getPermittedStudents} from '../../data/students';
import AVAILABLE_QUESTION_COMPONENTS, {getValidQuestionTypesForStudentToGuess} from './questions';
import GameData from '../../data/GameData';
import LiveGameScore from './small_components/LiveGameScore';
import SuccessPage from './pages/SuccessPage';
import StudentProfile from '../StudentProfile';
import GameTutorial, {storage as tutorialStorage} from '../../components/game/pages/GameTutorial';
import CircleProgress from '../CircleProgress';
import gameMuiTheme from '../../styles/gameMuiTheme';
import debugStorage from '../../data/debugStorage';
import {get_debug} from '../../lib/debug';

// Storage and its keys
const storage = new StorageEngine('game_play_environment');
const STUDENT_TO_GUESS_ID = 'studentToGuessID';
const QUESTION_TYPE = 'questionType';
const HAS_PLAYED_ALREADY = 'has_played_already';
const HAS_SEEN_FLAG_TUTORIAL = 'has_seen_flag_tutorial';

const QUESTIONS_TO_SHOW_BEFORE_BREAK_IF_FIRST_TIME_PLAYING = 3;
let QUESTIONS_TO_SHOW_BEFORE_BREAK_RANGE = [6, 8];  // because 7 is lucky ;)

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
    const initialQuestionType = debugStorage.get('initialQuestionType') || storage.get(QUESTION_TYPE);
    let remainingQuestionsCount;
    if (storage.get(HAS_PLAYED_ALREADY)) {
      remainingQuestionsCount = this.getNewRemainingQuestionsCount();
    } else {
      remainingQuestionsCount = QUESTIONS_TO_SHOW_BEFORE_BREAK_IF_FIRST_TIME_PLAYING;
    }
    this.state = {
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

  /**
   * This is called from several places, including the tutorial page, the
   * success page, and the failure/memory refresher page.
   */
  handleContinue() {
    storage.set(HAS_SEEN_FLAG_TUTORIAL, true);
    this.setState({
      justBadlyGuessedStudent: null,
    });
    if (this.state.remainingQuestionsCount === 0) {
      const remainingQuestionsCount = this.getNewRemainingQuestionsCount();
      this.setState({
        remainingQuestionsCount,
        questionsInRound: remainingQuestionsCount,
      });
    }
    this.loadNextQuestion();
  }

  componentWillMount() {
    // Only loads a new student on mount if there wasn't already a student
    // loaded. This prevents a user from cheating by refreshing the app
    // manually.
    this.loadNextQuestion(this.state.studentToGuess, this.state.questionType);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the state has just reached 0 questions remaining, the user
    // is considered to have played the game once.
    if (this.state.remainingQuestionsCount === 0 && prevState.remainingQuestionsCount > 0) {
      storage.set(HAS_PLAYED_ALREADY, true);
    }
  }

  decrementRemainingQuestionsCount() {
    this.setState({
      remainingQuestionsCount: this.state.remainingQuestionsCount - 1,
    });
  }

  handleGoodGuess() {
    this.decrementRemainingQuestionsCount();
    this.loadNextQuestion();
  }

  handleBadGuess() {
    this.decrementRemainingQuestionsCount();
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
    const recentGuesses = GameData.getRecentlyGuessedStudentIDs().slice(0, 2);
    const guessUniverse = _.filter(GameData.getFilteredStudents(), (s) => {
      return (
        !recentGuesses.includes(s.id)
        || (forcedStudent && forcedStudent.id === s.id)
      );
    });
    const newStudent = forcedStudent || _.sample(guessUniverse);
    if (_.isNil(newStudent)) {
      alert(
        'We could not find a new student. Perhaps review your filter' +
        ' settings before continuing.'
      );
      Router.goToPath('/');
    }
    // This helps us determine how difficult this student is for this user
    const questionTypeUniverse = getValidQuestionTypesForStudentToGuess(newStudent);
    const questionType = (
      forcedQuestionType || _.sample(_.keys(questionTypeUniverse))
    );
    // Don't include the same student as the student to be guessed or
    // any students of a different sex than the student to be guessed,
    // lest the game be too easy.
    let guessPool = _.reject(guessUniverse, (s) => {
      return s.id === newStudent.id || s.sex !== newStudent.sex;
    });
    // OPTIMIZE: The whole list needn't be shuffled just to get a random sample.
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
                      icon={<ImageNavigateNext />}
                      labelPosition='before'
                      buttonStyle={{
                        height: 50,
                        minWidth: window.innerWidth * 0.75,
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
        forceUpdateParent={() => this.forceUpdate()}
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
            circleProgressPercent={GameData.getGuessRatio({maxDepth: this.state.questionsInRound}) * 100} />
          {this.renderContinueBlock()}
        </div>
      );
    } else if (this.state.justBadlyGuessedStudent) {
      primaryComponent = (
        <div className='padding'>
          <StudentProfile
            student={this.state.justBadlyGuessedStudent}
            isLarge={true}
            showFlagTutorial={!storage.get(HAS_SEEN_FLAG_TUTORIAL)}
          />
          {this.renderContinueBlock()}
        </div>
      );
    } else {
      primaryComponent = (
        <div>
          {/* Tiny status indicator about how easy this guess probably is */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 2,
          }}>
            {
              get_debug() &&
              <CircleProgress size={20}
                              color={colors.green500}
                              percent={GameData.guessRatioForStudent(this.state.studentToGuess) * 100}
                              label='' />
            }
          </div>
          {question()}
        </div>
      );
    }

    const minimumHeight = $(window).height() - gameMuiTheme.appBar.height;

    return (
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        minHeight: minimumHeight,
      }}>
        <LinearProgress
          style={{
            position: 'fixed',
            top: gameMuiTheme.appBar.height,
            left: 0,
            right: 0,
          }}
          mode='determinate'
          color={colors.greenA400}
          value={this.state.questionsInRound - this.state.remainingQuestionsCount}
          max={this.state.questionsInRound}
        />

        {
          userHasSeenTutorial &&
          <LiveGameScore style={{marginTop: 8}} />
        }

        {primaryComponent}
      </div>
    );
  }
}

GamePlayEnvironment.propTypes = {};

export default GamePlayEnvironment;
