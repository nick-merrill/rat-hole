import React from 'react';
import students from '../data/students';
import PropTypes from 'prop-types';
import {Paper} from 'material-ui';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isflag: false};
  }

  flag() {
    this.setState({isflag: !this.state.isflag})
  }

  render() {
    let student = this.props.student;
    const imageSize = 150;

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
        <h2 style={{textAlign:'left'}}>
          {student.firstName} {student.lastName} &nbsp;
          <i onClick={() => this.flag()}>
            <i className={this.state.isflag ? "fa  fa-star" : "fa  fa-star-o" }></i></i>
        </h2>
        <div style={{textAlign:'left'}}>
          {student.bio.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>;
          })}
        </div>

      </div>
    );
  }
}

StudentProfile.propTypes = {
  student: PropTypes.object.isRequired
};

export default StudentProfile;
