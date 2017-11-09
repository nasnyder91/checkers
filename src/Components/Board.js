import React, { Component } from 'react';
import Square from './Square';
//import './App.css';

const boardLayout = [
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w'],
  ['w','b','w','b','w','b','w','b'],
  ['b','w','b','w','b','w','b','w']
]
const piecesLayout = [
  [false,'Red',false,'Red',false,'Red',false,'Red'],
  ['Red',false,'Red',false,'Red',false,'Red',false],
  [false,'Red',false,'Red',false,'Red',false,'Red'],
  [false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false],
  ['White',false,'White',false,'White',false,'White',false],
  [false,'White',false,'White',false,'White',false,'White'],
  ['White',false,'White',false,'White',false,'White',false]
];



class Board extends Component {
  constructor(){
    super();
    this.state = {
      squares: [],
      selectedPiece: {index: null,
                      player: null}
    }
  }


//Set up pieces in default locations for new game.
//-----------------------------------------------------------------
  newGame(){
    let squares = [];
    for(var r = 0; r < piecesLayout.length; r++){
      let row = piecesLayout[r];

      for(var c = 0; c < row.length; c++){
        let square = {
          index: squares.length,
          color: boardLayout[r][c],
          row: r,
          col: c,
          hasPiece: row[c],
          highlighted: false
        }
        if(!row[c]){
          square.hasPiece = null
        }
        squares.push(square);
      }
    }
    this.setState({
      squares: squares
    });
  }


//----------------------------------------------------------------

  handleSquareSelected(r,c,player,index){
    let squares = this.state.squares;
    if(player){
      let moves;

      this.unhighlight();

      squares[index].highlighted = !squares[index].highlighted;

      moves = this.findPossibleMoves(r,c,player);

      if(moves){
        for(var x = 0; x < moves.length; x++){
          squares[moves[x]].highlighted = !squares[moves[x]].highlighted;
        }
      }


      this.setState({
        squares: squares,
        selectedPiece: {index: index,
                        player: player}
      });
    } else if((this.state.selectedPiece.player != null) && (squares[index].highlighted)){
      squares[index].hasPiece = this.state.selectedPiece.player;
      squares[this.state.selectedPiece.index].hasPiece = null;

      this.setState({
        squares: squares,
        selectedPiece: {index: null,
                        player: null}
      });
      this.unhighlight();
    }
  }



  //Find all possible moves for selected piece
  //------------------------------------------------------------------------------------
  findPossibleMoves(r,c,player){
    let moves = [];
    let squares = this.state.squares;

    if(player === "Red"){
      if((r+1) <= 7){
        if((c-1) >= 0){
          let square = squares[this.indexForSquare(r+1,c-1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'White'){
            if(((r+2) <= 7) && ((c-2) >= 0))
              if(!squares[this.indexForSquare(r+2,c-2)].hasPiece){
                moves.push(this.indexForSquare(r+2,c-2));
            }
          }
        }
        if((c+1) <= 7){
          let square = squares[this.indexForSquare(r+1,c+1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'White'){
            if(((r+2) <= 7) && ((c+2) <= 7))
              if(!squares[this.indexForSquare(r+2,c+2)].hasPiece){
                moves.push(this.indexForSquare(r+2,c+2));
            }
          }
        }
      }
      return moves;
    }

    if(player === "White"){
      if((r-1) >= 0){
        if((c-1) >= 0){
          let square = squares[this.indexForSquare(r-1,c-1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'Red'){
            if(((r-2) <= 7) && ((c-2) >= 0))
              if(!squares[this.indexForSquare(r-2,c-2)].hasPiece){
                moves.push(this.indexForSquare(r-2,c-2));
            }
          }
        }
        if((c+1) <= 7){
          let square = squares[this.indexForSquare(r-1,c+1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'Red'){
            if(((r-2) <= 7) && ((c+2) <= 7))
              if(!squares[this.indexForSquare(r-2,c+2)].hasPiece){
                moves.push(this.indexForSquare(r-2,c+2));
            }
          }
        }
      }
      return moves;
    }
  }
  //------------------------------------------------------------------------------------------


  findPossibleJump(){

  }

//unhighlight all squares
  unhighlight(){
    let squares = this.state.squares;

    for(var i = 0; i < squares.length; i++){
      if(squares[i].highlighted){
        squares[i].highlighted = false;
      };
    };
    this.setState({
      squares: squares
    });
  }


  //Find index for square at row and col
  indexForSquare(r,c){
    let squares = this.state.squares;

    for(var i = 0; i < squares.length; i++){
      if((squares[i].row === r) && (squares[i].col === c)){
        return(
          squares[i].index
        );
      }
    }
  }



  componentWillMount(){
    this.newGame();
  }




  render() {
    let board;

    board = this.state.squares.map(square => {
      return (
        <Square color={square.color} row={square.row} col={square.col} hasPiece={square.hasPiece} highlighted={square.highlighted} squareSelected={this.handleSquareSelected.bind(this)} index={square.index} key={square.row + "-" + square.col} />
      );
    });


    return (
      <div className="Board">
        {board}
      </div>
    );
  }
}

export default Board;
