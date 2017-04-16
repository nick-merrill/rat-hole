import React from 'react';
import {FlatButton} from 'material-ui';

import Router from '../lib/Router';
import muiTheme from '../styles/muiTheme';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <FlatButton label='Clear Local Storage'
                    labelStyle={{color: muiTheme.palette.dangerColor}}
                    onClick={() => {
                      localStorage.clear();
                      Router.informOfChangeManually();
                    }}/>
      </div>
    );
  }
}

export default Settings;
