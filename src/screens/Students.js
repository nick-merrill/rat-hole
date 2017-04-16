import React from 'react';
import students from '../data/students';
import {Card, TextField} from 'material-ui';
import StudentProfile from './StudentProfile';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <TextField value={this.state.search} onChange={this.handleSearchChange} />
        {/*<StudentProfile student={s} />*/}
        {
          students.map((s, index) => (
            <Card className='padding' style={{background: '#eee'}}
                   key={index}>
              <StudentProfile student={s} />
            </Card>
          ))
        }
      </div>
    );
  }
}

export default Students;
