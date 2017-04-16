import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blue500, blueGrey500
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: blueGrey500,
  },
});

export default muiTheme;
