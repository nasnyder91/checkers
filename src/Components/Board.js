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
                      player: null,
                      king: false},
      redScore: 0,
      whiteScore: 0
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
                        hasKing: false,
                        highlighted: false,
                        jumpable: false
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
      this.highlightMoves(r,c,player,index);
    } else if((this.state.selectedPiece.player != null) && (squares[index].highlighted)){
      this.handleMove(r,c,player,index);
    }
  }



  highlightMoves(r,c,player,index){
    let moves;
    let jumpable;
    let squares = this.state.squares;

    this.unhighlight();

    squares[index].highlighted = !squares[index].highlighted;

    if(squares[index].hasKing){
      moves = this.findPossibleKingMoves(r,c,player).moves;
      jumpable = this.findPossibleKingMoves(r,c,player).jumpable;
    }else{
      moves = this.findPossibleMoves(r,c,player).moves;
      jumpable = this.findPossibleMoves(r,c,player).jumpable;
    }


    if(moves){
      for(var x = 0; x < moves.length; x++){
        squares[moves[x]].highlighted = !squares[moves[x]].highlighted;
      }
      if(jumpable){
        for(var y = 0; y < jumpable.length; y++){
          squares[jumpable[y]].jumpable = !squares[jumpable[y]].jumpable;
        }
      }
    }

    this.setState({
      squares: squares,
      selectedPiece: {index: index,
                      player: player,
                      king: squares[index].hasKing}
    });
  }


// HANDLE THE JUMP--------------------------------------------------------------------------------------
  handleMove(r,c,player,index){
    let squares = this.state.squares;
    let jumped;

    squares[index].hasPiece = this.state.selectedPiece.player;
    squares[index].hasKing = this.state.selectedPiece.king;
    squares[this.state.selectedPiece.index].hasPiece = null;
    squares[this.state.selectedPiece.index].hasKing = false;

    if((this.state.selectedPiece.player === "White") && (r === 0)){
      squares[index].hasKing = true;
    }
    if((this.state.selectedPiece.player === "Red") && (r === 7)){
      squares[index].hasKing = true;
    }

    if(Math.abs(squares[this.state.selectedPiece.index].row - squares[index].row) === 2){
      jumped = squares[this.indexForSquare((Math.min(squares[this.state.selectedPiece.index].row,squares[index].row))+1,Math.min(squares[this.state.selectedPiece.index].col,squares[index].col)+1)];
      if(jumped.hasPiece === "White"){
        this.setState({
          redScore: this.state.redScore + 1
        });
      }else if(jumped.hasPiece === "Red"){
        this.setState({
          whiteScore: this.state.whiteScore + 1
        });
      }
      jumped.hasPiece = null;
    }

    this.setState({
      squares: squares,
      selectedPiece: {index: null,
                      player: null,
                      king: false}
    });
    //------------------------------------------------------------------------------------------------------
    this.unhighlight();

    //Check for double jump, handle if available
    if(jumped){
      let jumpable;
      if(squares[index].hasKing){
        jumpable = this.findPossibleKingMoves(squares[index].row,squares[index].col,squares[index].hasPiece).jumpable;
      } else{
        jumpable = this.findPossibleMoves(squares[index].row,squares[index].col,squares[index].hasPiece).jumpable;
      }

      if(jumpable > 0){
        this.handleSquareSelected(squares[index].row,squares[index].col,squares[index].hasPiece,index);
      }else{
      }
    }
  }


  //Find all possible moves for selected piece
  //------------------------------------------------------------------------------------
  findPossibleMoves(r,c,player){
    let moves = [];
    let jumpable = [];
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
                jumpable.push(square.index);
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
                jumpable.push(square.index);
            }
          }
        }
      }
      return {moves, jumpable};
    }

    if(player === "White"){
      if((r-1) >= 0){
        if((c-1) >= 0){
          let square = squares[this.indexForSquare(r-1,c-1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'Red'){
            if(((r-2) >= 0) && ((c-2) >= 0))
              if(!squares[this.indexForSquare(r-2,c-2)].hasPiece){
                moves.push(this.indexForSquare(r-2,c-2));
                jumpable.push(square.index);
            }
          }
        }
        if((c+1) <= 7){
          let square = squares[this.indexForSquare(r-1,c+1)];
          if(!square.hasPiece){
            moves.push(square.index);
          }else if(square.hasPiece === 'Red'){
            if(((r-2) >= 0) && ((c+2) <= 7))
              if(!squares[this.indexForSquare(r-2,c+2)].hasPiece){
                moves.push(this.indexForSquare(r-2,c+2));
                jumpable.push(square.index);
            }
          }
        }
      }
      return {moves, jumpable};
    }
  }


  findPossibleKingMoves(r,c,player){
    let moves = [];
    let jumpable = [];
    let squares = this.state.squares;
    let color;
    if(player === 'White'){
      color = "Red";
    } else{
      color = "White";
    }


    if((r+1) <= 7){
      if((c-1) >= 0){
        let square = squares[this.indexForSquare(r+1,c-1)];
        if(!square.hasPiece){
          moves.push(square.index);
        }else if(square.hasPiece === color){
          if(((r+2) <= 7) && ((c-2) >= 0))
            if(!squares[this.indexForSquare(r+2,c-2)].hasPiece){
              moves.push(this.indexForSquare(r+2,c-2));
              jumpable.push(square.index);
          }
        }
      }
      if((c+1) <= 7){
        let square = squares[this.indexForSquare(r+1,c+1)];
        if(!square.hasPiece){
          moves.push(square.index);
        }else if(square.hasPiece === color){
          if(((r+2) <= 7) && ((c+2) <= 7))
            if(!squares[this.indexForSquare(r+2,c+2)].hasPiece){
              moves.push(this.indexForSquare(r+2,c+2));
              jumpable.push(square.index);
          }
        }
      }
    }
    if((r-1) >= 0){
      if((c-1) >= 0){
        let square = squares[this.indexForSquare(r-1,c-1)];
        if(!square.hasPiece){
          moves.push(square.index);
        }else if(square.hasPiece === color){
          if(((r-2) >= 0) && ((c-2) >= 0))
            if(!squares[this.indexForSquare(r-2,c-2)].hasPiece){
              moves.push(this.indexForSquare(r-2,c-2));
              jumpable.push(square.index);
          }
        }
      }
      if((c+1) <= 7){
        let square = squares[this.indexForSquare(r-1,c+1)];
        if(!square.hasPiece){
          moves.push(square.index);
        }else if(square.hasPiece === color){
          if(((r-2) >= 0) && ((c+2) <= 7))
            if(!squares[this.indexForSquare(r-2,c+2)].hasPiece){
              moves.push(this.indexForSquare(r-2,c+2));
              jumpable.push(square.index);
          }
        }
      }
    }
    return {moves, jumpable};
  }

  //------------------------------------------------------------------------------------------


//unhighlight all squares
  unhighlight(){
    let squares = this.state.squares;

    for(var i = 0; i < squares.length; i++){
      if(squares[i].highlighted || squares[i].jumpable){
        squares[i].highlighted = false;
        squares[i].jumpable = false;
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
        <Square color={square.color} row={square.row} col={square.col} hasPiece={square.hasPiece} hasKing={square.hasKing} highlighted={square.highlighted} jumpable={square.jumpable} squareSelected={this.handleSquareSelected.bind(this)} index={square.index} key={square.row + "-" + square.col} />
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
