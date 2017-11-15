import React, { Component } from 'react';
import '../App.css';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="ScoreBoard">
        <table>
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
        <label>Turn: {this.props.turn}</label> <br/>
        <button onClick={this.props.newGame}>New Game</button>
      </div>
    );
  }
}

export default ScoreBoard;
