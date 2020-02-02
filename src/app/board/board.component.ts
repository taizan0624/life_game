import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public boardArray;

  constructor() { }

  ngOnInit() {
    //Initialize life-board
    //death:0, alive:1
    this.boardArray =
      [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
      ];

  }

  public changeLife(line, row){
    if(this.boardArray[line][row] === 0){ //Give birth
      this.boardArray[line][row] = 1;
    } else if (this.boardArray[line][row] === 1) { //Kill
      this.boardArray[line][row] = 0;
    }
  }

  public nextGeneration(){
    let updatedBoard = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ];

    for(let i=0; i<8; i++){
      for(let j=0; j<8; j++){
        if(this.boardArray[i][j] === 0){
          updatedBoard[i][j] = this.actionForDead(i,j);
        } else {
          updatedBoard[i][j] = this.actionForAlive(i,j);
        }
      }
    }

    this.boardArray = updatedBoard;
  }

  //return 1 if the cell is surrounded by 3 lives
  //return 0 if not
  public actionForDead(i,j){
    let nearByLives = this.countAround(i,j);

    if(nearByLives === 3){
      return 1;
    }

    return 0;
  }

  //return 1 if surrounded by 2 or 3 lives
  //return 0 if not
  public actionForAlive(i,j){
    let nearByLives = this.countAround(i,j);

    if(nearByLives === 2 || nearByLives === 3){
      return 1;
    }

    return 0;

  }

  //return number of lives surrounding the cell
  public countAround(i,j){
    let upLeft = 0;
    let upMiddle = 0;
    let upRight = 0;
    let left = 0;
    let right = 0;
    let downLeft = 0;
    let downMiddle = 0;
    let downRight = 0;

    if(0<=i-1){
      if(0<=j-1){
        upLeft = this.boardArray[i-1][j-1];
      }
      upMiddle = this.boardArray[i-1][j];
      if (j+1<8){
        upRight = this.boardArray[i-1][j+1];
      }
    }

    if(0<=j-1){
      left = this.boardArray[i][j-1];
    }
    if(j+1<8){
      right = this.boardArray[i][j+1];
    }

    if(i+1<8){
      if(0<=j-1){
        downLeft = this.boardArray[i+1][j-1];
      }
      downMiddle = this.boardArray[i+1][j];
      if (j+1<8){
        downRight = this.boardArray[i+1][j+1];
      }
    }

    let surroundings = [upLeft, upMiddle, upRight, left, right, downLeft, downMiddle, downRight];

    let count = 0;
    for (let cell in surroundings){
      if(surroundings[cell] === 1){
        count ++;
      }
    }

    return count;
  }

}
