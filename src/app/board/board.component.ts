import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  // representation of the nine squares on the board
  squares: any[];
  // help us track whose turn it is
  xIsNext: boolean;
  // will either be 'X', 'O', null or undefined
  winner: string | null | undefined;
}
