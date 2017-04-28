import React from 'react';
import PropTypes from 'prop-types';
import {RadialBar, RadialBarChart} from 'recharts';
import _ from 'lodash';

// This is the width of the bar if the radius is 100
const BAR_SIZE = 7;

class CircleProgress extends React.Component {
  render() {
    const width = this.props.size;
    const labelText = _.isNaN(this.props.percent) ? '---'
      : `${Math.round(this.props.percent)}%`;
    const label = (
      <div
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: 'center',
          fontSize: '1.3em',
          color: this.props.color,
        }}
      >
        {
          _.isNil(this.props.label) ? labelText
            : this.props.label
        }
      </div>
    );
    const data = [
      {
        value: this.props.percent || 0,
        fill: this.props.color || '#ff0000',
      },
    ];
    return (
      <div style={{
        position: 'relative',
        verticalAlign: 'middle',
        width: width,
        margin: '0 auto',
      }}>
        {label}
        <RadialBarChart width={width} height={width}
                        barGap={0}
                        barSize={BAR_SIZE}
                        innerRadius={width / 2 - BAR_SIZE * 2}
                        outerRadius={width / 2}
                        onClick={this.props.onClick}
                        data={data}>
          <RadialBar background={true}
                     startAngle={90} // starts from the top, like a clock
                     endAngle={-270}
                     minAngle={0}
                     // allows circle to fill entirely at 100%
                     maxAngle={this.props.percent / 100 * 360}
                     isAnimationActive={this.props.shouldAnimate}
                     dataKey='value' />
        </RadialBarChart>
      </div>
    );
  }
}

CircleProgress.propTypes = {
  // This will be both the width and height of the graph
  size: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  label: PropTypes.string,
  color: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  onClick: PropTypes.func,
};

CircleProgress.defaultProps = {
  shouldAnimate: true,
};

export default CircleProgress;
