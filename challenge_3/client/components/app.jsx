import React from 'react';
import ScoreBoard from './scoreBoard.jsx';
import PinsPad from './pinsPad.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrame: 1,
      firstRoll: true,
      rollA: null,
      rollB: null,
      pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
      currentRoll: 1,
      runningTotal: 0,
      frames:
        [
          0,
          {rollA: '', rollB: '', total: ''},
          {rollA: '', rollB: '', total: ''},
          {rollA: '', rollB: '', total: ''}
        ],
    };
    this.updatePins = this.updatePins.bind(this);
    }

  updatePins(e) {
    const pin = Number(e.target.value);
    var current = this.state.currentFrame;
    if (this.state.firstRoll) {
      var updatedFrames = this.state.frames.slice();
      updatedFrames[current].rollA = pin;
      updatedFrames[current].total = this.state.runningTotal + pin;
      const newPins = this.state.pinsAvailable.slice(0, this.state.pinsAvailable.length-pin);

      this.setState({
        pinsAvailable: newPins,
        firstRoll: false,
        rollA: pin,
        currentRoll: 2,
        frames: updatedFrames,
        runningTotal: updatedFrames[current].total
      });
    } else {
      var updatedFrames = this.state.frames.slice();
      updatedFrames[current].rollB = pin;
      updatedFrames[current].total = this.state.runningTotal + pin;

      this.setState({
        rollB: pin,
        firstRoll: true,
        pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
        currentRoll: 1,
        currentFrame: current + 1,
        frames: updatedFrames
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Frame: {this.state.currentFrame}</h1>
        <h2>Roll: {this.state.currentRoll}</h2>
        <ScoreBoard frames={this.state.frames}
        />
        <PinsPad pinsAvailable={this.state.pinsAvailable}
          updatePins={this.updatePins}
        />
      </div>
    );
  }
}

export default App;