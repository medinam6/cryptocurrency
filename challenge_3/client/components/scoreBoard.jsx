import React from 'react';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frames: [1,2,3],
      1: {rollA: 2, rollB: 4},
      2: {rollA: '', rollB: ''},
      3: {rollA: '', rollB: ''}
    };
  }

  render() {
    let frames =this.state.frames;
    let eachFrame = frames.map((x) => {
      return (
        <div>
          <div>Frame: {x}</div>
          <div>**roll 1: {this.state[x].rollA}</div>
          <div>**roll 2: {this.state[x].rollB}</div>
        </div>
      )
    });

    return (
      <div>{eachFrame}</div>
    );
  }
}

export default ScoreBoard;
