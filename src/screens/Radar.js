import React from 'react';
import {
  FlatButton, FloatingActionButton, MenuItem,
  TextField, Dialog, SelectField
} from 'material-ui';
import {ContentCreate} from 'material-ui/svg-icons';
import {getFlaggedStudentIDs, getPermittedStudents} from '../data/students';
import * as _ from 'lodash';
import InfoLabel from '../components/InfoLabel';
import * as radar from '../data/radar';
import muiTheme from '../styles/muiTheme';
import * as encryption from '../data/encryption';
import StudentProfileCard from '../components/StudentProfileCard';

class Radar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
    window.radar = radar;
  }

  componentWillMount() {
    this.clearCreateData();
    this.updateStudents();
  }

  componentDidMount() {
    // To keep moment times somewhat accurate.
    this.updateIntervalID = setInterval(() => {
      this.forceUpdate();
    }, 30 * 1000);  // every 30 seconds
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalID);
  }

  /**
   * These students have been marked as "On My Radar".
   * Puts never checked-in students first, then sorts by longest-ago check-in
   * first and most recent check-in last.
   */
  updateStudents() {
    const flaggedStudentIDs = getFlaggedStudentIDs();
    let students = _.filter(getPermittedStudents(), (s) => {
      return flaggedStudentIDs.includes(s.id);
    });
    // Set relevant student data directly on the student object.
    _.each(students, (s) => {
      s.momentOfLastCheckIn = radar.momentOfLastCheckInForStudent(s);
    });
    const neverCheckedInStudents = _.filter(students, {momentOfLastCheckIn: null});
    const checkedInStudents = _.reject(students, {momentOfLastCheckIn: null});
    students = neverCheckedInStudents.concat(
      _.sortBy(checkedInStudents, 'momentOfLastCheckIn')
    );
    this.setState({
      students,
    });
  }

  clearCreateData() {
    this.setState({
      // These have to do with creating a check in for a student.
      isCreating: false,
      createStudent: null,
      createStudentErrorText: null,
      createNoteInput: '',
    });
  }

  handleCreate() {
    if (_.isNil(this.state.createStudent)) {
      this.setState({
        createStudentErrorText: 'Student is required',
      });
      return;
    }
    radar.addCheckIn(this.state.createStudent, this.state.createNoteInput);
    this.clearCreateData();
    this.updateStudents();
  }

  render() {
    return (
      <div>
        <InfoLabel label='Encrypted Data' iconClassName='fa fa-lock'>
          <p>
            In order to keep the data from your Radar secure, we encrypt
            both which students are on your Radar, and the details of
            your Check-ins.
          </p>
          <p>
            As a consequence,
            {' '}
            <span style={{color: muiTheme.palette.dangerColor}}>
                if you get a new phone, you will not be able to access this data
                anymore
              </span>.
            {' '}
            To be able to restore your data to a new phone, write down this
            encryption key somewhere safe:
          </p>
          <div style={{
            fontFamily: 'monospace',
            textAlign: 'center',
          }}>{encryption.getKey()}</div>
        </InfoLabel>

        {
          this.state.students.length === 0 &&
          <p className='padding'>
            Add students to your Radar by starring them from the
            Student List.
          </p>
        }

        <div>
          {
            this.state.students.map((s) => (
              <StudentProfileCard
                key={s.id}
                student={s}
                isLarge={false}
                shouldCollapseDetails={true}
              >
                {
                  s.momentOfLastCheckIn ?
                    `Last checked in ${s.momentOfLastCheckIn.fromNow()}`
                    : '—Never checked in—'
                }
              </StudentProfileCard>
            ))
          }
        </div>

        <FloatingActionButton
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: 36,
          }}
          onTouchTap={() => this.setState({isCreating: true})}
        >
          <ContentCreate />
        </FloatingActionButton>

        <Dialog
          title="Check-in"
          titleStyle={{
            textAlign: 'left',
            fontSize: muiTheme.appBar.titleFontSize
          }}
          contentStyle={{width: '90%'}}
          actions={[
            <FlatButton
              label='Cancel'
              secondary={true}
              onTouchTap={() => this.clearCreateData()}
            />,
            <FlatButton
              label='Record Check-in'
              primary={true}
              onTouchTap={this.handleCreate.bind(this)}
            />,
          ]}
          modal={true}
          open={this.state.isCreating}
        >
          <SelectField
            floatingLabelText="Student"
            value={this.state.createStudent}
            onChange={(event, index, value) => this.setState({createStudent: value})}
            errorText={this.state.createStudentErrorText}
            autoWidth={true}
          >
            {
              this.state.students.map((s) => (
                <MenuItem key={s.id} value={s} primaryText={s.fullName} />
              ))
            }
          </SelectField>
          <TextField id='note-input'
                     multiLine={true}
                     floatingLabelText='Note (optional)'
                     onChange={(event) => this.setState({createNoteInput: event.target.value})}
                     value={this.state.createNoteInput}
                     fullWidth={true} />
        </Dialog>
      </div>
    );
  }
}

export default Radar;
