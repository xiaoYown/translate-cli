import './index.less';
import { Component } from 'react';
import { filesWrapper } from '@root/stores';
import { Chart } from '@antv/g2';

@filesWrapper
class Overview extends Component {
  hasInitChart = false
  chartList = []

  componentDidMount() {
    this.renderCharts();
  }
  componentDidUpdate() {
    const { info } = this.props.filesStore;
    if (!this.hasInitChart && Object.keys(info).length) {
      this.renderCharts();
      this.hasInitChart = true;
    }
  }
  renderCharts = () => {
    const { info } = this.props.filesStore;
    for (let key in info) {
      let chart = new Chart({
        container: key,
        autoFit: true,
        // height: 200
      });
      chart.data([{
        type: key,
        value: info[key].percent * 100,
      }]);
      chart.facet('rect', {
        fields: ['type'],
        padding: 20,
        showTitle: false,
        eachView: (view, facet) => {
          const data = facet.data;
          let color;
          color = '#0a9afe';
          // color = '#f0657d';
          data.push({ type: '缺省', value: 100 - data[0].value });
          view.data(data);
          view.coordinate('theta', {
            radius: 0.8,
            innerRadius: 0.5
          });
          view
            .interval()
            .adjust('stack')
            .position('value')
            .color('type', [color, '#eceef1'])
            .style({
              opacity: 1,
            });
          view.annotation().text({
            position: ['50%', '50%'],
            content: data[0].type,
            style: {
              fontSize: 12,
              fill: '#8c8c8c',
              fontWeight: 300,
              textBaseline: 'bottom',
              textAlign: 'center'
            },
            offsetY: -12,
          });

          view.annotation().text({
            position: ['50%', '50%'],
            content: data[0].value,
            style: {
              fontSize: 18,
              fill: '#000',
              fontWeight: 500,
              textAlign: 'center'
            },
            offsetY: 10,
          });

          view.interaction('element-active');
        }
      });
      chart.render();
      this.chartList.push(chart);
    }
  }
  render() {
    const { info } = this.props.filesStore;
    return <div className="page-Overview g-page">
      <div className="page-Overview-header">完成度</div>
      {
        Object.keys(info).map(lang => {
          return <div
            key={lang}
            id={lang}
            className="m-overview-chart"
          >
          </div>
        })
      }
    </div>
  }
}

export default Overview;
