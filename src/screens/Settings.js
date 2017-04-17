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
                      // When we log back in, will be nicer not to come to the
                      // settings page.
                      Router.goToPath('/');
                      // Just in case the path change doesn't inform the view.
                      Router.informOfChangeManually();
                    }}/>
      </div>
    );
  }
}

export default Settings;
