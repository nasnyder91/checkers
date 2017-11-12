import React, { Component } from 'react';
import '../App.css';

class Square extends Component {
  squareSelected(r,c,player,index){
    this.props.squareSelected(r,c,player,index);
  }


  render() {
    const player = (this.props.hasPiece ? this.props.hasPiece : null);
    const row = this.props.row;
    const col = this.props.col;
    const index = this.props.index;

    let color;
    if(this.props.color === 'w'){
      color = 'White';
    }else{
      color = 'Black';
    }
    const classes = "Square " + color + " " + (this.props.highlighted ? "Highlighted" : false) + " " + (this.props.jumpable ? "Jumpable" : false);
    const pieceClasses = "Piece " + (this.props.hasPiece ? this.props.hasPiece : null);


    return (
      <div className={classes} onClick={this.squareSelected.bind(this,row,col,player,index)}>
        {this.props.hasPiece &&
          <div className={pieceClasses}>
            {this.props.hasKing &&
              <div className="King"></div>
            }
          </div>
        }
      </div>
    );
  }
}

export default Square;
