import React from 'react';
import {getCurrentUser} from '../data/users';
import {getPermittedStudents} from '../data/students';
import * as _ from 'lodash';
import {roles} from '../data/constants';
import StudentProfile from '../components/StudentProfile';
import {Card} from 'material-ui';
import pluralize from 'pluralize';
import * as colors from 'material-ui/styles/colors';

class UnrecognizedStudentsList extends React.Component {
  constructor(props) {
    const currentUser = getCurrentUser();
    window.roles = roles;
    window.currentUser = currentUser;
    if (![roles.dean, roles.tutor].includes(currentUser.role)) {
      throw new Error(
        `A ${currentUser.role} is not authorized to access this view.`
      );
    }
    super(props);
    this.state = {
      students: this.getUnrecognizedStudents(),
    };
  }

  /**
   * Faked data about which students are least recognized.
   */
  getUnrecognizedStudents() {
    // Tutors will only see a few unrecognized students, while deans will see
    // more.
    const numUnrecognized = getCurrentUser().role === roles.dean ?
      10 : 2;
    let students = _.sampleSize(getPermittedStudents(), numUnrecognized);
    _.each(students, (s) => {
      s.numIdentifications = _.sample([0, 1, 2]);
    });
    return students;
  }

  render() {
    const currentUser = getCurrentUser();

    const sortedStudents = _.sortBy(this.state.students, 'numIdentifications');

    return (
      <div>
        <h3>
          { // Display proper header depending on user's role
            {
              dean: `${currentUser.house.name} Students`,
              tutor: 'Students in Your Entryway',
            }[currentUser.role]
          }
        </h3>

        <div>
          {
            sortedStudents.map((s) => (
              <Card key={s.id} className='margin padding student'>
                <StudentProfile student={s}
                                shouldCollapseDetails={true}>
                  <p style={{color: colors.red900}}>
                    Recognized by {s.numIdentifications > 0 && 'only'}
                    {' '}
                    <strong>{s.numIdentifications}</strong>
                    {' '}
                    {pluralize('tutor', s.numIdentifications)}
                  </p>
                </StudentProfile>
              </Card>
            ))
          }
        </div>
      </div>
    );
  }
}

export default UnrecognizedStudentsList;
