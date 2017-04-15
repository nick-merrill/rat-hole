import React from 'react';
import students from '../data/students';
import {Paper, TextField} from 'material-ui';

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
          students.map((s) => (
            <Paper key={s.id}>
             <div>{s.firstName}</div>
            </Paper>
          ))
        }
      </div>
    );
  }
}

export default Students;
