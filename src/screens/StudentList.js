import React from 'react';
const Fuse = window.Fuse;

import {getPermittedStudents} from '../data/students';
import {TextField} from 'material-ui';
import StudentProfileCard from '../components/StudentProfileCard';

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
      include: ['score'],
      threshold: 0.1,
      location: 0,
      distance: 2000,  // allows for long bios
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: [
        'firstName',
        'lastName',
        'fullName',
        'year',       // 2017, for example
        'yearString', // 'sophomore', for example
        'concentration',
        'bio',
      ]
    });
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

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
                   floatingLabelText="Search (name, year, bio)"
                   onChange={this.handleSearchChange.bind(this)}/>
        {
          filteredStudents.map((x) => {
            const student = x.item || x;
            return (
              <StudentProfileCard key={student.id} student={student} />
            );
          })
        }
      </div>
    );
  }
}

export default StudentList;
