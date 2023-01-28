# ng-beginner
Angular 2 (v15) beginner tutorial.

## Introduction
We will build a tic-tac-toe game in this tutorial. The game will have a board of 3x3 squares. Two players will take turns to mark a square with their symbol (either X or O). The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

### Install Node.js
Download and install Node.js from [here](https://nodejs.org/en/download/).

### Install Angular CLI
Open a terminal and run the following command to install Angular CLI globally.
```shell
npm install -g angular-cli
```

### Create a new project
Create a new project using the Angular CLI.
```shell
ng new ng-beginner
```
We'll be prompted to answer a few questions. The answers are as follows:
```
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
```

### If you are using Visual Studio Code
Install extensions :
- Angular language service
- Angular 2 TypeScript Snippets
- Angular console

## Startup the project
Open a terminal and navigate to the project folder. Run the following command to start the project.
```shell
ng serve
```
Open a browser and navigate to http://localhost:4200.

## Application

### Create first component
Create a new component called `square` using the Angular CLI.
```shell
 ng generate component square --inline-template --inline-style
```
or
```shell
 ng g c square -t -s
```
This component will have its HTML template and CSS styles inside.
We will use this component to display a square in the board.

A neq folder called `square` will be created in the `src/app` folder. The following files will be created:
- `square.component.css`
- `square.component.html`

```
app
├── app-routing.module.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
└── square
    ├── square.component.spec.ts
    └── square.component.ts
```

Add the component in the app component template.
```html
<app-square></app-square>
<router-outlet></router-outlet>
```

Just as an example, we could display a random number in the square component,
updated every second.
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-square',
  template: `
    <p>
      {{ random }}
    </p>
  `,
  styles: [
  ]
})
export class SquareComponent {
  random = Math.random();

  constructor() {
    setInterval(() => {
      this.random = Math.random();
    }, 1000);
  }
}
```

### Pass data to a component
We want to pass the value of the square to the square component. 
We will use the `@Input` decorator to do that.

`square.component.ts`
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <p>
      {{ value }}
    </p>
  `,
  styles: [],
})
export class SquareComponent {
  @Input() value?: 'X' | 'O';
}
```
__Note:__ The `?` after `value` means that the value is optional, so that TypeScript 
won't complain if we don't pass a value to the component.

`app.component.html`
```html
<app-square value='X'></app-square>
<app-square [value]="'O'"></app-square>
<router-outlet></router-outlet>
```
__Note:__ The `[value]` syntax is called property binding.
It is used to bind a property of a component to a value. 

>We just made our first UI (or dumb) component because it doesn't have any logic. 
> Those components are called presentational components. 
> They are used to display data, are easily testable and reusable.

### Create the board component
Create a new component called `board` using the Angular CLI.
```shell
 ng g c board
```
Which will create a new folder called `board` in the `src/app` folder.
```
app/board
├── board.component.html
├── board.component.scss
├── board.component.spec.ts
└── board.component.ts
```
- `board.component.html` is the template of the component.
- `board.component.scss` is the CSS styles of the component.
- `board.component.spec.ts` is the unit test of the component.
- `board.component.ts` is the TypeScript code of the component.

`board.component.ts`
```typescript
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
```
We start by defining the properties of the board component.
- `squares` is an array of nine elements. Each element will be either 'X', 'O' or null.
- `xIsNext` is a boolean that will help us track whose turn it is.
- `winner` will either be `'X'`, `'O'`, `null` or `undefined`
  - If it is `'X'`, it means that X won the game.
  - If it is `'O'`, it means that O won the game.
  - If it is `null`, it means that the game is not finished yet.
  - If it is `undefined`, it means that the game is finished and there is no winner.

We now use the onInit lifecycle hook to initialize the board.
```typescript
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
  winner: string | null | undefined;

  ngOnInit() {
    this.newGame();
  }

  // we initialize the game
  //// we set the squares to an array of 9 nulls
  //// we set the winner to null
  //// we set xIsNext to true
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    // X is the first player
    this.xIsNext = true;
  }
}
```

We are going to use a javascript getter to identify the player.
```typescript
// identify the current player
get player() {
  return this.xIsNext ? 'X' : 'O';
}
```

We then are going to simulate a move on the board.
```typescript
// simulate a move
makeMove(idx: number) {
  if (!this.squares[idx]) {
    // if the square is falsy, we fill it with the current player
    this.squares.splice(idx, 1, this.player);
    // we switch the player
    this.xIsNext = !this.xIsNext;
  }
}
```

We then check if there is a winner.
```typescript
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
        return this.squares[a];
      }
    }
    // if there is no winner, we return null
    return null;
  }
```

## Now, let's take care of the User Interface

### Create the board template

We first display the current player.
`board.component.html`
```html
<h1>Current Player: {{ player }} </h1>
```
We then display a button to start a new game.
```html
<button (click)="newGame()">Start new game</button>
```
We then display the nine squares.
```html
<main>
    <app-square
            *ngFor="let square of squares; let i = index"
            [value]="square"
            (click)="makeMove(i)">
    </app-square>
</main>
```
- `*ngFor` is a structural directive that loops through the squares array and creates a new square component for each element.
- `[value]="square"` is an attribute directive that passes the value of the square to the square component.
- `(click)="makeMove(i)"` is an event binding that calls the makeMove method when the user clicks on a square.

We want to finally display the winner, if there is one.
```html
<h2>
    <ng-container *ngIf="winner">Player {{ winner }} wins! </ng-container>
</h2>
```
- `*ngIf` is a structural directive that displays the winner if there is one.
- `<ng-container>` is a structural directive that does not create a new DOM element.
- `{{ winner }}` is an interpolation that displays the winner.

The final template looks like this:

`board.component.html`
```html
<h1>Current Player: {{ player }} </h1>

<button (click)="newGame()">Start new game</button>

<h2>
    <ng-container *ngIf="winner">Player {{ winner }} wins! </ng-container>
</h2>

<main>
    <app-square
            *ngFor="let square of squares; let i = index"
            [value]="square"
            (click)="makeMove(i)">
    </app-square>
</main>
```
