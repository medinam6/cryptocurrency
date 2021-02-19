import React from 'react';
import ReactPaginate from 'react-paginate';
import Results from './results.jsx';

class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      prev: '',
      next: '',
      last: '',
      pages: 0,
      pageCount: 0,
      perPage: 10,
      currentPage: 0,
      data: ''
    }
    this.parseLinkHeader = this.parseLinkHeader.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  parseLinkHeader(link) {
    let linkObj = {};
    const commas = link.split(',');
    commas.forEach((l) => {
      var eachLink = l.split(';');
      var url = eachLink[0].replace(/<(.*)>/, '$1').trim();
      var rel = eachLink[1].replace(/rel="(.*)"/, '$1').trim();
      return linkObj[rel] = url;
    });

    return linkObj;
  };

  updateState(link, count) {
    const linkObj = this.parseLinkHeader(link);

    this.setState({
      first: linkObj[first],
      prev: linkObj[rev],
      next: linkObj[next],
      last: linkObj[last],
      count: count,
      pageCount: Math.floor(count/10),
    });
  };

  handlePageClick(e) {
    // const selectedPage = e.selected;
    // const offset = selectedPage * this.state.perPage;

    // this.setState({
    //     currentPage: selectedPage,
    //     offset: offset
    // }, () => {
    //     this.updateState()
    // });
    console.log(hi, e);
  };

  render() {
    let listedData;
    if (this.state.data === '') {
      listedData = this.props.events;
    } else {
      listedData = this.state.data;
    }

    // this.updateState(this.props.paginateLink, this.props.paginateCount);

    return (
      <div className="App">
      <h1>React Paginate Example</h1>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      <Results events={listedData}/>
    </div>
    );
  }
}

export default Paginate;