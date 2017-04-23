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
    const imageSize = this.props.size === 'small' ? 70 : _.min([
      window.innerWidth * 0.75,
      window.innerHeight / 2]
    );

    const imageStyle = this.props.size === 'small' ?
      {
        float: 'right',
      } : {
        margin: '0 auto',
      };

    const defaultChildren = (
      <div>
        <p>
          <strong>Concentration:</strong> {student.concentration}
        </p>
        <p>
          <strong>Year:</strong> {student.year}
        </p>
        {
          student.bio.split('\n').map((item, key) => {
            return <span key={key}>{item}<br /></span>;
          })
        }
      </div>
    );

    return (
      <div style={{textAlign: 'center'}}>
        <Paper circle={true}
               style={{
                 ...imageStyle,
                 height: imageSize,
                 width: imageSize,
                 overflow: 'hidden',
               }}>
          <img src={student.imageURL} alt={student.firstName}
               style={{height: imageSize}} />
        </Paper>
        <h2 style={{textAlign: 'left'}}>
          {student.firstName} {student.lastName} &nbsp;
          <i className={this.state.isFlagged ? 'fa fa-star' : 'fa fa-star-o' }
             style={{color: muiTheme.palette.flagColor}}
             onClick={() => this.flag()} />
        </h2>
        <div style={{textAlign: 'left'}}>
          {this.props.children || defaultChildren}
        </div>
      </div>
    );
  }
}

StudentProfile.propTypes = {
  student: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};

StudentProfile.defaultProps = {
  size: 'large',
};

export default StudentProfile;
