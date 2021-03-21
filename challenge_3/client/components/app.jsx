import React from 'react';
import ScoreBoard from './scoreBoard.jsx';
import PinsPad from './pinsPad.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: 1,
      strike: false,
      spare: false,
      currentFrame: 1,
      rollA: null,
      firstRoll: true,
      pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
      currentRoll: 1,
      runningTotal: 0,
      frames:
        [
          0,
          {rollA: '', rollB: '', total: '', bonus: ''},
          {rollA: '', rollB: '', total: '', bonus: ''},
          {rollA: '', rollB: '', total: '', bonus: ''},
        ],
    };
    this.updatePins = this.updatePins.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.firstRoll = this.firstRoll.bind(this);
    this.secondRoll = this.secondRoll.bind(this);
    this.strike = this.strike.bind(this);
    this.spare = this.spare.bind(this);
    }

  startNewGame() {
    const newGame = this.state.games + 1;
    this.setState({
      games: newGame,
      currentFrame: 1,
      rollA: null,
      runningTotal: 0,
      frames:
      [
        0,
        {rollA: '', rollB: '', total: '', bonus: ''},
        {rollA: '', rollB: '', total: '', bonus: ''},
        {rollA: '', rollB: '', total: '', bonus: ''},
      ]
    })
  }

  firstRoll(pin, current) {
    var updatedFrames = this.state.frames.slice();
    var updatedRunningTotal = this.state.runningTotal;
    if (this.state.strike) {
      updatedFrames[current - 1].bonus = pin;
    }
    if (this.state.spare) {
      updatedFrames[current - 1].bonus = updatedFrames[current - 1].bonus + pin;
      updatedFrames[current - 1].total = updatedFrames[current - 1].total + updatedFrames[current - 1].bonus;
      updatedRunningTotal = updatedRunningTotal + pin;
    }
    var updatedFrames = this.state.frames.slice();
    updatedFrames[current].rollA = pin;
    updatedFrames[current].total = updatedRunningTotal + pin;
    const newPins = this.state.pinsAvailable.slice(0, this.state.pinsAvailable.length-pin);

    this.setState({
      pinsAvailable: newPins,
      firstRoll: false,
      rollA: pin,
      currentRoll: 2,
      frames: updatedFrames,
      runningTotal: updatedFrames[current].total,
      spare: false,
    });
  }

  secondRoll(pin, current) {
    var updatedFrames = this.state.frames.slice();
    if (this.state.strike) {
      updatedFrames[current - 1].bonus = updatedFrames[current - 1].bonus + pin;
      updatedFrames[current - 1].total = this.state.runningTotal + pin;
      updatedFrames[current].rollB = pin;
      updatedFrames[current].total = updatedFrames[current - 1].total + updatedFrames[current - 1].bonus;
      this.setState({
        firstRoll: true,
        pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
        currentRoll: 1,
        currentFrame: current + 1,
        frames: updatedFrames,
        runningTotal: updatedFrames[current].total,
        strike: false,
      });
    } else {
      updatedFrames[current].rollB = pin;
      updatedFrames[current].total = this.state.runningTotal + pin;
      this.setState({
        firstRoll: true,
        pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
        currentRoll: 1,
        currentFrame: current + 1,
        frames: updatedFrames,
        runningTotal: updatedFrames[current].total,
      });
    }
  }

  strike(pin, current) {
    var updatedFrames = this.state.frames.slice();
    updatedFrames[current].rollA = 'X';
    var updatedRunningTotal = this.state.runningTotal + pin;

    this.setState({
      currentFrame: current + 1,
      frames: updatedFrames,
      strike: true,
      runningTotal: updatedRunningTotal,
    });
  }

  spare(pin, current) {
    var updatedFrames = this.state.frames.slice();
    updatedFrames[current].rollB = '/';
    updatedFrames[current].bonus = pin;
    var updatedRunningTotal = this.state.runningTotal + pin;
    this.setState({
      firstRoll: true,
      runningTotal: updatedRunningTotal,
      pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
      currentRoll: 1,
      currentFrame: current + 1,
      frames: updatedFrames,
      spare: true,
    });
  }

  updatePins(e) {
    const pin = Number(e.target.value);
    const current = this.state.currentFrame;
    if (this.state.firstRoll && pin < 10) {
      this.firstRoll(pin, current);
    } else if (this.state.firstRoll && pin === 10) {
      this.strike(pin, current);
    } else if (!this.state.firstRoll && (this.state.rollA + pin) === 10) {
      this.spare(pin, current);
    } else {
      this.secondRoll(pin, current);
    }
  }

  render() {
    let newGame;
    if (this.state.currentFrame > 3) {
      newGame =
      <div>
        <div>End of Game {this.state.games}</div>
        <div>Total Score: {this.state.runningTotal}</div>
        <button onClick={this.startNewGame}>Start Game {this.state.games + 1}</button>
      </div>;
    } else {
      newGame = <div></div>;
    }

    return (
      <div>
        <h2>Game: {this.state.games}</h2>
        <h1>Frame: {this.state.currentFrame}</h1>
        <h2>Roll: {this.state.currentRoll}</h2>
        <PinsPad pinsAvailable={this.state.pinsAvailable}
          updatePins={this.updatePins}/>
        <ScoreBoard frames={this.state.frames}/>
        {newGame}
      </div>
    );
  }
}

export default App;