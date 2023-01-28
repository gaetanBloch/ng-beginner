# ng-beginner
Angular 2.0 beginner tutorial.

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

