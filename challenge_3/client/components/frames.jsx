import React from 'react';

function Frames(props) {
  const pins = props.pinsAvailable;
  const pinButtons = pins.map((pin) =>
    <button>{pin}</button>
  );
  return (
    <div>{pinButtons}</div>
  );
};

export default PinsPad;

renderscores() {
  let frames =this.state.frames;
  let eachFrame = frames.map((x) => {
    return (
      <div>
        <div>Frame: {x}</div>
        <div>roll 1: {this.state.x.rollA}</div>
        <div>roll 2: {this.state.x.rollB}</div>
      </div>
    )
  })
}