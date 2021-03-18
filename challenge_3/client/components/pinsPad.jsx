import React from 'react';

function PinsPad(props) {
  const pins = props.pinsAvailable;
  const pinButtons = pins.map((pin) =>
    <button>{pin}</button>
  );
  return (
    <div>{pinButtons}</div>
  );
};

export default PinsPad;