import React from 'react';
import Search from './search.jsx';
import Paginate from './paginate.jsx'

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      events: [],
      paginateLink: '',
      pageCount: 0,
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
    axios.get(`http://localhost:3000/events?q=${this.state.value}`)
      .then(res => {
        this.setState({
          pageCount: Math.ceil(res.data.length/10),
        });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
     <div>
       <Search handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        value={this.state.value} />
      <Paginate pageCount={this.state.pageCount}
        events={this.state.events}/>
     </div>
    );
  }
}

export default App;