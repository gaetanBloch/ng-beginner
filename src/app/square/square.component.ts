import { Component } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <p>
      {{ random }}
    </p>
  `,
  styles: [],
})
export class SquareComponent {
  random = Math.random();

  constructor() {
    setInterval(() => {
      this.random = Math.random();
    }, 1000);
  }
}
