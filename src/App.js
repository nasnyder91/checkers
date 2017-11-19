import React, { Component } from 'react';
import Board from './Components/Board';
import ScoreBoard from './Components/ScoreBoard';
import './App.css';
import Navbar from 'react-bootstrap/lib/Navbar';





class App extends Component {
  constructor(){
    super();
    this.state = {
      scores: {
                redScore: 0,
                whiteScore: 0
              },
      turn: "White"
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
              },
      turn: "White"
    });
  }

  win(player){
    alert(player + " wins!");
  }

  render() {
    const navbar = (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="../../index.html">Classic Games Collection | Nick Snyder</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    return (
      <div className="App">
        {navbar}
        <h1 className="Title">Checkers</h1>
        <Board scores={this.handleScores.bind(this)} turn={this.changeTurn.bind(this)} onRef={ref => {this.child = ref;}} winner={this.win.bind(this)} />
        <ScoreBoard scores={this.state.scores} turn={this.state.turn} newGame={this.newGame} />
      </div>
    );
  }
}

export default App;
