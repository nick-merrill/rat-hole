import React from 'react';
import {
  AutoComplete,
  FlatButton, FloatingActionButton, MenuItem,
  TextField
} from 'material-ui';
import {Dialog} from 'material-ui-build-next';
import {ContentCreate} from 'material-ui/svg-icons';
import {momentOfLastCheckInForStudent} from '../data/radar';
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

    const flaggedStudentIDs = getFlaggedStudentIDs();
    let students = _.filter(getPermittedStudents(), (s) => {
      return flaggedStudentIDs.includes(s.id);
    });
    // Set relevant student data directly on the student object.
    _.each(students, (s) => {
      s.momentOfLastCheckIn = momentOfLastCheckInForStudent(s);
    });

    const studentDataSource = _.map(students, (s) => {
      return {
        text: s.fullName,
        value: (
          <MenuItem primaryText={s.fullName} secondaryText={s.id} />
        )
      };
    });

    this.state = {
      // These students have been marked as "On My Radar"
      students,
      studentDataSource,
    };
  }

  componentWillMount() {
    this.clearCreateData();
    // FIXME!!!!!!!!!!!!!!
    this.setState({
      isCreating: true,
    });
  }

  clearCreateData() {
    this.setState({
      // These have to do with creating a check in for a student.
      isCreating: false,
      createStudent: null,
      createNote: '',
    });
  }

  handleCreate() {
    radar.addCheckIn(this.state.checkInStudent.id, this.state.checkInBody);
    this.clearCreateData();
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
                    s.momentOfLastCheckIn.fromNow()
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
          onRequestClose={() => this.clearCreateData()}
          title="Check-in"
          titleStyle={{textAlign: 'left', fontSize: muiTheme.appBar.titleFontSize}}
          contentStyle={{width: '90%'}}
          actionButton={
            <FlatButton
              label='Record Check-in'
              primary={true}
              labelStyle={{color: muiTheme.palette.primary1Color}}
              onTouchTap={this.handleCreate.bind(this)}
            />
          }
            // actions={[
          //   <FlatButton
          //     label='Cancel'
          //     secondary={true}
          //     onTouchTap={() => this.clearCreateData()}
          //   />,
          // ]}
          modal={true}
          open={this.state.isCreating}
        >
          <AutoComplete name='student'
                        required={true}
                        dataSource={this.state.studentDataSource}
                        floatingLabelText='Student'
                        fullWidth={true}
                        openOnFocus={true}
                        onUpdateInput={(v) => this.setState({checkInStudent: v})} />
          <TextField name='check-in'
                     multiLine={true}
                     floatingLabelText='Note'
                     onChange={(event) => this.setState({checkInBody: event.target.value})}
                     value={this.state.checkInBody}
                     fullWidth={true} />
        </Dialog>
      </div>
    );
  }
}

export default Radar;
