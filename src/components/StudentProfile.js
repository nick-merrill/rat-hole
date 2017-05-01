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

    const flag = (
      <i className={this.state.isFlagged ? 'fa fa-star' : 'fa fa-star-o' }
         style={{color: muiTheme.palette.flagColor}}
         onClick={() => this.flag()} />
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
        <div style={{textAlign: 'left'}}>
          <h3 style={{
            textAlign: 'left',
            display: 'inline-block',
            marginBottom: 0
          }}>
            {student.firstName} {student.lastName} &nbsp;
          </h3>
          {
            this.props.showFlagTutorial ?
            <Paper zDepth={3} style={{
              display: 'inline-block',
              padding: 8,
              color: muiTheme.palette.flagColor,
              background: 'transparent',
              border: '1px solid',
              borderColor: muiTheme.palette.flagColor,
            }}>
              {flag}
              {' '}
              <i className='ion ion-arrow-left-c' />
              {' '}
              Star to add to "My Radar"
            </Paper>
              :
              flag
          }
        </div>
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
  showFlagTutorial: PropTypes.bool,
};

StudentProfile.defaultProps = {
  isLarge: false,
  shouldCollapseDetails: false,
};

export default StudentProfile;
