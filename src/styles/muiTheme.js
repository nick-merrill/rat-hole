import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  amber500,
  blue500, blueGrey500, red500
} from 'material-ui/styles/colors';

// I don't think we want to go with Harvard branding because it makes an app
// seem clunky and old. If we did go with school colors theme, it might make
// it feel more like part of the school, but I'd be more inclined to do
// house-specific branding, like a little bunny for Leverett on the home screen,
// for example. For now though, I think going with a more modern color scheme
// than Harvard's crimson will help us engage the user in the "game"
// environment.
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: blueGrey500,
    dangerColor: red500,
    flagColor: amber500,
  },
});

export default muiTheme;
