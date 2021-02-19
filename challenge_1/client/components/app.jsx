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
      paginateCount: 0,
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
    axios.get(`http://localhost:3001/events?q=${this.state.value}&_page=7&_limit=10`)
      .then(res => {
        this.setState({
          events: res.data,
          paginateLink: res.headers.link,
          paginateCount: Number(res.headers['x-total-count']),
        });
        console.log(res.headers.link, res);
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
      <Paginate paginateLink={this.state. paginateLink}
        paginateCount={this.state.paginateCount}
        events={this.state.events}/>
     </div>
    );
  }
}

export default App;

//I think that the way to do this is by attaching the link websites in the paginate elements and then sending the new list to result and updating paginate to the new links