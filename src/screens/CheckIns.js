import React from 'react';
import {
  Dialog, FlatButton, FloatingActionButton,
  RaisedButton
} from 'material-ui';
import {ContentCreate} from 'material-ui/svg-icons';

class CheckIns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.clearCreateData();
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

    this.clearCreateData();
  }

  render() {
    return (
      <div>
        <h2>Longest Since Check-in</h2>
        <FloatingActionButton style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: 36,
        }}>
          <ContentCreate />
        </FloatingActionButton>


        <Dialog
          title="Dialog With Actions"
          actions={[
            <FlatButton
              label='Cancel'
              onTouchTap={() => this.setState({isCreating: false})}
            />,
            <RaisedButton
              label='Add Check-in'
              onTouchTap={this.handleCreate.bind(this)}
            />
          ]}
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}

export default CheckIns;
