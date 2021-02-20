import React from 'react';
import Chart from 'chart.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    const myChartRef = this.myRef.current.getContext('2d');
    const chartLabels = this.props.bitLabels;
    const chartData = this.props.bitData;

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Bit',
            data: chartData,
          }
        ]
      },
      options : {
        //customize
      }
    });
  }

  render(){

    return (
      <div>
        <canvas
            id="myChart"
            ref={this.myRef}
        />
      </div>
    )
  }
}

export default Test;