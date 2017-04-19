import React from 'react';
import PropTypes from 'prop-types';
import {RadialBar, RadialBarChart} from 'recharts';
import _ from 'lodash';

const width = 200;

class CircleProgress extends React.Component {
  render() {
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
          _.isNil(this.props.label) ? `${Math.round(this.props.percent)}%`
            : this.props.label
        }
      </div>
    );
    const data = [
      {
        value: this.props.percent,
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
                        barGap={10} barSize={20}
                        innerRadius='45%' outerRadius='100%'
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
  percent: PropTypes.number.isRequired,
  label: PropTypes.string,
  fill: PropTypes.string,
  shouldAnimate: PropTypes.bool,
};

CircleProgress.defaultProps = {
  shouldAnimate: true,
};

export default CircleProgress;
