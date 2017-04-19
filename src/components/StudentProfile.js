import React from 'react';
import {Paper} from 'material-ui';
import PropTypes from 'prop-types';
import muiTheme from '../styles/muiTheme';
import {getFlag, setFlag} from '../data/students';
import * as _ from 'lodash';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFlagged: getFlag(props.student)};
  }

  flag() {
    let student = this.props.student;
    setFlag(student, !this.state.isFlagged);
    this.setState({
      isFlagged: getFlag(student),
    });
  }

  render() {
    let student = this.props.student;
    const imageSize = _.min([
      window.innerWidth * 0.75,
      window.innerHeight / 2]
    );

    return (
      <div style={{textAlign: 'center'}}>
        <Paper circle={true}
               style={{
                 height: imageSize,
                 width: imageSize,
                 overflow: 'hidden',
                 margin: '0 auto',
               }}>
          <img src={student.imageURL} alt={student.firstName}
               style={{height: imageSize}}/>
        </Paper>
        <h2 style={{textAlign: 'left'}}>
          {student.firstName} {student.lastName} &nbsp;
          <i className={this.state.isFlagged ? 'fa fa-star' : 'fa fa-star-o' }
             style={{color: muiTheme.palette.flagColor}}
             onClick={() => this.flag()} />
        </h2>
        <div style={{textAlign: 'left'}}>
          {
            student.bio.split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>;
            })
          }
        </div>

      </div>
    );
  }
}

StudentProfile.propTypes = {
  student: PropTypes.object.isRequired
};

export default StudentProfile;
