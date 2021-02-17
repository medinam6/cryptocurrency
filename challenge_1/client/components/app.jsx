import React from 'react';
import Search from './search.jsx';
import ReactPaginate from 'react-paginate';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:3001/events?q=${this.state.value}`)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
     <div>
       <Search handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        value={this.state.value}/>
     </div>
    );
  }
}

export default App;