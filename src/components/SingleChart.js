import React from 'react';
import PropTypes from 'prop-types';
import CircleProgress from './CircleProgress';
import {Bar, BarChart} from 'recharts';
import * as _ from 'lodash';

class SingleChart extends React.Component {
  render() {
    const {data, mini} = this.props;
    const shouldAnimate = !mini;

    let availableWidth = data.fullWidth ? 200 : 130;
    if (mini) {
      availableWidth = 30;
    }

    let graphElement;
    if (!_.isNil(data.percent)) {
      graphElement = (
        <CircleProgress
          shouldAnimate={shouldAnimate}
          size={availableWidth}
          percent={data.percent}
          label={mini ? '' : data.label}
          color={data.color} />
      );
    } else if (!_.isNil(data.bars)) {
      graphElement = (
        <BarChart
          width={availableWidth}
          height={availableWidth}
          data={data.bars}>
          <Bar
            dataKey='value'
            fill={data.color}
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