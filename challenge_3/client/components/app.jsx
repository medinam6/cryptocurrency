import React from 'react';
import ScoreBoard from './scoreBoard.jsx';
import PinsPad from './pinsPad.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 1,
      currentScore: 0,
      rollA: null,
      rollB: null,
      currentRoll: 1,
      pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
    };
  }

  render() {
    return (
      <div>
        <h1>Frame: {this.state.currentFrame}</h1>
        <h2>Roll: {this.state.currentRoll}</h2>
        <ScoreBoard />
        <PinsPad pinsAvailable={this.state.pinsAvailable}/>
      </div>
    );
  }
}

export default App;