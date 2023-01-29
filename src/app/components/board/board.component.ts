import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // representation of the nine squares on the board
  squares: any[];
  // help us track whose turn it is
  xIsNext: boolean;
  // will either be 'X', 'O', null or undefined
  winner: 'X' | 'O' | null | undefined;

  ngOnInit() {
    this.newGame();
  }

  // we initialize the game
  //// we set the squares to an array of 9 nulls
  //// we set the winner to null
  //// we set xIsNext to true
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = undefined;
    // X is the first player
    this.xIsNext = true;
  }

  // identify the current player
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // simulate a move
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      // if the square is falsy, we fill it with the current player
      this.squares.splice(idx, 1, this.player);
      // we switch the player
      this.xIsNext = !this.xIsNext;
    }

    // we check if there is a winner
    this.winner = this.calculateWinner();
  }

  // check if there is a winner
  // cf React tutorial: https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
  calculateWinner() {
    // we define the winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // we loop through the winning combinations
    for (let i = 0; i < lines.length; i++) {
      // we destructure the winning combination
      const [a, b, c] = lines[i];
      // if the squares at the winning combination indexes are all equal and not falsy
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        // we return the winner
        // we use the nullish coalescing operator to return the winner
        // if it's not null or undefined (meaning there is already a winner)
        return this.winner ?? this.squares[a];
      }
    }
    // if there is no winner yet, return undefined, if it's a draw, return null
    return this.squares.includes(null) ? undefined : null;
  }
}
