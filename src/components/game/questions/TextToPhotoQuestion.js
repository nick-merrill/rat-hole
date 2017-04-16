import React from 'react';
import Question from './Question';
import muiTheme from '../../../styles/muiTheme';

class TextToPhotoQuestion extends Question {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      // We only need 3 other students for this Question type
      badStudentsToGuess: this.props.guessPool.slice(0, 3),
    });
  }

  render() {
    const good = this.props.studentToGuess;
    // TODO: Randomize this ordering.
    const allStudentOptions = [
      ...this.state.badStudentsToGuess,
      this.props.studentToGuess
    ];
    return (
      <div>
        <h2 style={{fontWeight: 300}}>
          Can you guess
          <br />
          <span style={{fontWeight: 'bold'}}>
            <span style={{color: muiTheme.palette.focusTextColor}}>
              {good.firstName}
            </span>
            <span style={{color: muiTheme.palette.softTextColor}}>
              {good.lastName}
            </span>
          </span>
          <br />
          from these photos?
        </h2>
        {
          allStudentOptions.map((s) => (
            <img
              key={s.id}
              src={s.imageURL} alt={s.firstName}
              style={{width: '90%'}}/>
          ))
        }
      </div>
    );
  }
}

export default TextToPhotoQuestion;
