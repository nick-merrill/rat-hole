// Thanks to https://github.com/expalmer/react-progress-form

var React    = require('react');
var classSet = require('./classSet');

var ProgressElement = React.createClass({
  componentDidUpdate: function() {
    // var percent = parseInt(this.props.percent);
  },
  render: function() {
    var percent = Math.floor(this.props.percent);
    var deg = 360*percent/100;
    var style = {
      transform: 'rotate('+ deg +'deg)',
    };
    var classes = classSet({
      "progress-pie-chart": true,
      "gt-50": percent > 50
    });
    return (
      <div className="progress clearfix">
        <div className={classes}>
          <div className="ppc-progress">
            <div className="ppc-progress-fill"
                 style={style}
                 ref="progress">
            </div>
          </div>
          <div className="ppc-percents">
            <div className="pcc-percents-wrapper">
              <span>{percent + '%'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProgressElement;
