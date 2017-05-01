import React from 'react';
import PropTypes from 'prop-types';
import CircleProgress from './CircleProgress';
import {Bar, BarChart, YAxis} from 'recharts';
import * as _ from 'lodash';

class SingleChart extends React.Component {
  render() {
    const {data, mini} = this.props;
    const shouldAnimate = !mini;

    let availableWidth = data.fullWidth ? 200 : 130;
    let availableHeight = availableWidth;
    if (mini) {
      availableWidth = 60;
      availableHeight = 30;
    }

    let graphElement;
    if (!_.isNil(data.percent)) {
      graphElement = (
        <CircleProgress
          shouldAnimate={shouldAnimate}
          size={availableHeight}
          percent={data.percent}
          label={mini ? '' : data.label}
          color={data.color} />
      );
    } else if (!_.isNil(data.bars)) {
      graphElement = (
        <BarChart
          width={availableWidth}
          height={availableHeight}
          data={data.bars}>
          <YAxis
            hide={true}
            dataKey='value'
            domain={[0, 1]}
          />
          <Bar
            dataKey='value'
            fill={data.color}
            minPointSize={2}
            isAnimationActive={shouldAnimate}
          />
        </BarChart>
      );
    } else {
      throw new Error('Could not render this type of data');
    }
    return (
      <div>
        {graphElement}
      </div>
    );
  }
}

SingleChart.propTypes = {
  data: PropTypes.object.isRequired,
  mini: PropTypes.bool,
};

SingleChart.defaultProps = {
  mini: false,
};

export default SingleChart;
