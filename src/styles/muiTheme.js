import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
const {
  amber500,
  blue500,
  blueGrey500,
  grey700,
  grey800,
  grey900,
  red500,
  white
} = colors;

// I don't think we want to go with Harvard branding because it makes an app
// seem clunky and old. If we did go with school colors theme, it might make
// it feel more like part of the school, but I'd be more inclined to do
// house-specific branding, like a little bunny for Leverett on the home screen,
// for example. For now though, I think going with a more modern color scheme
// than Harvard's crimson will help us engage the user in the "game"
// environment.
const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
    canvasColor: white,
    /*
     DESIGN: Use this color for text that is less important. This is perfect
     for helping the user's eyes be drawn towards what is more important.
     */
    softTextColor: grey800,
    verySoftTextColor: colors.grey500,
    /*
     DESIGN: Only use pure black for things we want to draw the user's
     eye towards.
     */
    focusTextColor: '#000',
    primary1Color: blue500,
    accent1Color: blueGrey500,
    dangerColor: red500,
    flagColor: amber500,
  },
  appBar: {
    color: grey700,
    titleFontWeight: 300,
    height: 44,
  },
});

export default muiTheme;
