import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import * as _ from 'lodash';
import {lighten} from 'material-ui/utils/colorManipulator';

const canvasColor = colors.grey800;

let gameMuiTheme = getMuiTheme(
  _.merge({}, darkBaseTheme, {
    palette: {
      textColor: colors.white,
      canvasColor: canvasColor,
      primary1Color: colors.lightBlue500,
      accent1Color: colors.blueGrey300,
      strongColor: colors.pink500,
      dangerColor: colors.red500,
      flagColor: colors.amber500,
    },
    appBar: {
      color: lighten(canvasColor, 0.2),
      textColor: colors.white,
    },
  })
);

_.merge(gameMuiTheme, {
  raisedButton: {
    primaryTextColor: gameMuiTheme.palette.textColor,
    // fontWeight: 'normal',
  },
});

// gameMuiTheme = getMuiTheme(darkBaseTheme);

export default gameMuiTheme;
