import React from 'react';
import PropTypes from 'prop-types';
import {RadialBar, RadialBarChart} from 'recharts';

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
        {this.props.percent}%
      </div>
    );
    const data = [{
      value: this.props.percent,
      fill: this.props.color || '#ff0000',
    }];
    return (
      <div style={{
        position: 'relative',
        verticalAlign: 'middle',
        width: width,
        margin: '0 auto',
      }}>
        { this.props.label ? label : '' }
        <RadialBarChart width={width} height={width}
                        barGap={10} barSize={20}
                        innerRadius='45%' outerRadius='100%'
                        data={data}>
          <RadialBar background={true}
                     startAngle={90}
                     endAngle={-270}
                     data={data}
                     dataKey='value'/>
        </RadialBarChart>
      </div>
    );
  }
}

CircleProgress.propTypes = {
  percent: PropTypes.number.isRequired,
  fill: PropTypes.string,
};

export default CircleProgress;