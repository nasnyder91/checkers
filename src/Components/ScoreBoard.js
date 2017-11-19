import React, { Component } from 'react';
import '../App.css';
import Button from 'react-bootstrap/lib/Button';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="ScoreBoard">
        <table border="1">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Red</th>
              <td>{this.props.scores.redScore}</td>
            </tr>
            <tr>
              <th>White</th>
              <td>{this.props.scores.whiteScore}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <label>Turn: {this.props.turn}</label> <br/>
        <Button className="newGameBtn" bsStyle="default" onClick={this.props.newGame}>New Game</Button>
      </div>
    );
  }
}

export default ScoreBoard;
