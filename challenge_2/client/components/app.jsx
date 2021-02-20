import React from 'react';
import Graph from './chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bitLabels: [],
      bitData: [],
      start: '',
      end: '',
    }
    this.formatBitData = this.formatBitData.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData(e) {
    e.preventDefault();

    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.start}&end=${this.state.end}`)
    .then(res => res.json())
    .then((result) => {
      this.formatBitData(result.bpi);
    })
    .catch(err => console.log(err))
  }

  handleChange(e, type){
    this.setState({
      [type]: e.target.value
    });
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
      <form onSubmit={this.getData}>
        <label>
          Start Date:
          <input type="text" placeholder="YYYY-MM-DD" value={this.state.value} onChange={(e) => this.handleChange(e, 'start')} />
        </label>
        <label>
        End Date:
          <input type="text" placeholder="YYYY-MM-DD" value={this.state.value} onChange={(e) => this.handleChange(e, 'end')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Graph bitLabels={this.state.bitLabels}
          bitData={this.state.bitData}/>
      </div>
    );
  }
};

export default App;