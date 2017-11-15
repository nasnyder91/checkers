import React, { Component } from 'react';
import Board from './Components/Board';
import ScoreBoard from './Components/ScoreBoard';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      scores: {
                redScore: 0,
                whiteScore: 0
              },
      turn: "White",
      newGame: false
    }
  }

  handleScores(redScore,whiteScore){
    let scores = this.state.scores;
    scores.redScore = redScore;
    scores.whiteScore = whiteScore;
    this.setState({
      scores: scores
    });
  }

  changeTurn(turn){
    this.setState({
      turn: turn
    });
  }

  newGame = () => {
    this.child.newGame();
    this.setState({
      scores: {
                redScore: 0,
                whiteScore: 0
              }
    });
  }

  render() {
    return (
      <div className="App">
        <Board scores={this.handleScores.bind(this)} turn={this.changeTurn.bind(this)} onRef={ref => {this.child = ref; }} />
        <ScoreBoard scores={this.state.scores} turn={this.state.turn} newGame={this.newGame} />
      </div>
    );
  }
}

export default App;
