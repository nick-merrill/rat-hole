import React from 'react';
import StudentProfile from './StudentProfile';
import {Card} from 'material-ui';

class StudentProfileCard extends React.Component {
  render() {
    return (
      <Card
        className='margin padding student'
      >
        <StudentProfile {...this.props} />
      </Card>
    );
  }
}

StudentProfileCard.propTypes = StudentProfile.propTypes;

export default StudentProfileCard;
