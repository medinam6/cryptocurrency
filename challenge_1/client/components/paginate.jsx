import React from 'react';
import ReactPaginate from 'react-paginate';
import Results from './results.jsx';

class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      events: '',
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

  handlePageClick(e) {
    // const selectedPage = e.selected;
    // const offset = selectedPage * this.state.perPage;

    // this.setState({
    //     currentPage: selectedPage,
    //     offset: offset
    // }, () => {
    //     this.updateState()
    // });
    console.log(e);
  };

  render() {
    const currentPageData = this.props.events.slice(0,11).map((e) => <div>{e}</div>);

    // this.updateState(this.props.paginateLink, this.props.paginateCount);

    return (
      <div className="App">
        <h1>React Paginate Example</h1>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={this.props.pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        {currentPageData}
      </div>
    );
  }
}

export default Paginate;