import React from 'react';
import {FlatButton, Toggle} from 'material-ui';

import Router from '../lib/Router';
import muiTheme from '../styles/muiTheme';
import debugStorage, {DEMO_MODE} from '../data/debugStorage';

class Settings extends React.Component {
  render() {
    return (
      <div className='padding'>
        <Toggle
          label="Demo Mode"
          toggled={debugStorage.get(DEMO_MODE)}
          labelPosition='right'
          style={{maxWidth: 150, margin: '0 auto'}}
          onToggle={(event, isChecked) => {
            debugStorage.set(DEMO_MODE, isChecked);
            this.forceUpdate();
          }}
        />
        <FlatButton label='Clear Local Storage'
                    labelStyle={{color: muiTheme.palette.dangerColor}}
                    style={{margin: 32}}
                    onClick={() => {
                      localStorage.clear();
                      // When we log back in, will be nicer not to come to the
                      // settings page.
                      Router.goToPath('/');
                      // Just in case the path change doesn't inform the view.
                      Router.informOfChangeManually();
                    }} />
      </div>
    );
  }
}

export default Settings;
