import React from 'react';

const Search = (props) => {
  return (
  <form onSubmit={props.handleSubmit}>
    <label>
      Search:
      <input type="text" value={props.value} onChange={props.handleChange} name="search" />
    </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default Search;
