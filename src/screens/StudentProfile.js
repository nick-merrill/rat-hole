import React from 'react';
import students from '../data/students';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: students[0],
    };
  }

  render() {
    let student = this.state.student;
    return (
      <div>
        <img src={student.imageURL} alt={student.firstName}
             style={{width: '50%'}}/>
        <h2 style={{textAlign:'left'}}>{student.firstName} {student.lastName}</h2>
        <div style={{textAlign:'left'}}>
          {student.bio.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })}
        </div>

      </div>
    );
  }
}

StudentProfile.propTypes = {};

export default StudentProfile;
