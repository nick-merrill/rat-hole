import React from 'react';
import {FlatButton, Paper} from 'material-ui';
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
    const isLarge = _.defaultTo(this.state.isLarge, this.props.isLarge);
    // The state can override whether this component shows student details.
    const shouldCollapseDetails = _.defaultTo(
      this.state.shouldCollapseDetails,
      this.props.shouldCollapseDetails
    );

    let student = this.props.student;

    let imageStyle;
    let imageSize;
    if (isLarge) {
      imageStyle = {
        margin: '0 auto',
      };
      imageSize = _.min([
        window.innerWidth * 0.75,
        window.innerHeight / 2
      ]);
    } else {
      imageStyle = {
        float: 'right',
      };
      imageSize = 70;
    }

    const details = (
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
               onClick={() => this.setState({isLarge: !isLarge})}
               style={{
                 ...imageStyle,
                 height: imageSize,
                 width: imageSize,
                 overflow: 'hidden',
               }}>
          <img src={student.imageURL} alt={student.firstName}
               style={{height: imageSize}} />
        </Paper>
        <h3 style={{textAlign: 'left'}}>
          {student.firstName} {student.lastName} &nbsp;
          <i className={this.state.isFlagged ? 'fa fa-star' : 'fa fa-star-o' }
             style={{color: muiTheme.palette.flagColor}}
             onClick={() => this.flag()} />
        </h3>
        <div style={{textAlign: 'left'}}>
          {this.props.children}
          {shouldCollapseDetails ?
            <div style={{textAlign: 'center'}}>
              <FlatButton label='Show More'
                          secondary={true}
                          onTouchTap={() => this.setState({shouldCollapseDetails: false})} />
            </div>
            : details
          }
        </div>
      </div>
    );
  }
}

StudentProfile.propTypes = {
  student: PropTypes.object.isRequired,
  isLarge: PropTypes.bool,
  shouldCollapseDetails: PropTypes.bool,
};

StudentProfile.defaultProps = {
  isLarge: false,
  shouldCollapseDetails: false,
};

export default StudentProfile;
