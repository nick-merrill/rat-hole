import React from 'react';
const Fuse = window.Fuse;

import {getPermittedStudents} from '../data/students';
import {Card, TextField} from 'material-ui';
import StudentProfile from '../components/StudentProfile';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.permittedStudents = getPermittedStudents();
    // See http://fusejs.io/ to understand these options.
    this.studentFuse = new Fuse(this.permittedStudents, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 60,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'firstName',
        'lastName',
        'year',
        'concentration',
        'sex',
        'bio',
      ]
    });
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  // TODO: debounce this bad boy!
  filterStudents(search) {
    let ret = getPermittedStudents();
    if (search) {
      ret = this.studentFuse.search(search);
    }
    return ret;
  }

  render() {
    let filteredStudents = this.filterStudents(this.state.search);
    return (
      <div>
        <TextField value={this.state.search}
                   name='student-search'
                   floatingLabelText="Search"
                   onChange={this.handleSearchChange.bind(this)}/>
        {
          filteredStudents.map((s, index) => (
            <Card className='margin padding' style={{background: '#f4f4f4'}}
                  key={index}>
              <StudentProfile student={s}/>
            </Card>
          ))
        }
      </div>
    );
  }
}

export default StudentList;
