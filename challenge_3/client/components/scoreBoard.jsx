import React from 'react';

function ScoreBoard(props) {
  let frames = props.frames;
  let eachFrame = frames.map((x) => {
    if (frames.indexOf(x) !== 0) {
      return (
        <div>
          <h4>Frame: {frames.indexOf(x)}</h4>
          <div>Roll 1: {x.rollA}</div>
          <div>Roll 2: {x.rollB}</div>
          <div>Score: {x.total}</div>
        </div>
        )
      }
    });

    return (
      <div>
        {eachFrame}
        <br></br>
      </div>
    );
}

export default ScoreBoard;
