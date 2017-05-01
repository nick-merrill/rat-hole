import React from 'react';
import GameData from '../../../data/GameData';
import SingleChart from '../../SingleChart';
import {Dialog, FlatButton, Paper} from 'material-ui';
import {lighten} from 'material-ui/utils/colorManipulator';
import gameMuiTheme from '../../../styles/gameMuiTheme';
import muiTheme from '../../../styles/muiTheme';
import PropTypes from 'prop-types';

// Maximum history analyzed for success ratio
// Allow for rapid changes to make choices appear more impactful
const MAX_DEPTH = 5;
// Max number of data points on graph
// Allow to see about 2 minutes worth of progress
const MAX_NUM_DATA_POINTS = 5;

class LiveGameScore extends React.Component {
  constructor(props) {
    super(props);
    const data = GameData.getCommonData();
    this.state = {
      isHelpOpen: false,
      data,
      timeData: {
        bars: [{value: 0}],
        color: data[2].color,
      },
    };
  }

  componentDidMount() {
    GameData.subscribeToGuessing((data) => {
      this.setState({
        data: GameData.getCommonData(),
      });

      let newTimeBars = this.state.timeData.bars.concat({
        value: GameData.getGuessRatio({maxDepth: MAX_DEPTH}),
      });
      if (newTimeBars.length > MAX_NUM_DATA_POINTS) {
        newTimeBars = newTimeBars.slice(
          newTimeBars.length - MAX_NUM_DATA_POINTS,
          newTimeBars.length
        );
      }
      this.setState({
        timeData: Object.assign({}, this.state.timeData, {
          bars: newTimeBars,
        }),
      });
    });
  }

  render() {
    let {data, timeData} = this.state;
    // Replace third graph with real data
    data[2] = timeData;
    data[2].title = 'Improvement';
    data[3] = {
      title: 'Streak',
      textOnly: true,
      text: GameData.getLatestGoodGuessStreakCount(),
      color: data[3].color,
    };

    return (
      <div
        onClick={() => this.props.allowDialog && this.setState({isHelpOpen: true})}
        style={{
          ...this.props.style,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {
          data.map((d, index) => (
            <div key={index} style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '0 1 auto',
            }}>
              {
                this.props.showTitles &&
                  <div style={{fontSize: '0.75em', padding: 4, textAlign: 'center'}}>
                    {d.title}
                  </div>
              }
              {
                d.textOnly ?
                  <div style={{
                    color: d.color,
                    display: 'inline-block',
                    textAlign: 'center',
                    lineHeight: '30px',
                    verticalAlign: 'middle',
                    height: 30,
                  }}>{d.text}</div>
                  :
                  <SingleChart data={d} mini={true} />
              }
            </div>
          ))
        }
        <Dialog
          open={this.state.isHelpOpen}
          actions={[<FlatButton primary={true} label='Got it' onTouchTap={() => this.setState({isHelpOpen: false})} />]}
          contentStyle={{width: '90%'}}
        >
          <Paper zDepth={3} style={{
            background: lighten(gameMuiTheme.palette.canvasColor, 0.2),
            border: '1px solid',
            borderColor: muiTheme.palette.flagColor,
            marginBottom: 16,
            padding: 8,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '0.8em',
            }}>
              {/*<div>House Knowledge</div>*/}
              {/*<div>Latest Record</div>*/}
              {/*<div>Improvement</div>*/}
              {/*<div>Current Streak</div>*/}
            </div>
            <LiveGameScore showTitles={true} allowDialog={false} />
          </Paper>
        </Dialog>
      </div>
    );
  }
}

LiveGameScore.propTypes = {
  showTitles: PropTypes.bool,
  allowDialog: PropTypes.bool,
};

LiveGameScore.defaultProps = {
  showTitles: false,
  allowDialog: true,
};

export default LiveGameScore;
