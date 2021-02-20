import React from 'react';
import Test from './chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bitLabels: [],
      bitData: [],
    }
    this.formatBitData = this.formatBitData.bind(this);
  }

  componentDidMount() {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-30')
    .then(res => res.json())
    .then((result) => {
      this.formatBitData(result.bpi);
    })
    .catch(err => console.log(err))
  }

  formatBitData(bitData) {
    var dates = [];
    var prices = [];
    for (var key in bitData) {
      dates.push(key);
      prices.push(bitData[key]);
    };
    this.setState({
      bitLabels: dates,
      bitData: prices
    });
  }

  render() {
    return (
      <div>
        <Test bitLabels={this.state.bitLabels}
          bitData={this.state.bitData}/>
      </div>
    );
  }
};

export default App;