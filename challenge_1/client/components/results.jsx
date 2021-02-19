import React from 'react';

const Results = (props) => {
  const events = props.events;
  const listEvents = events.map((e) =>
    <li>{e.date}</li>
  );
  return (
    <ul>{listEvents}</ul>
  )
};

export default Results;