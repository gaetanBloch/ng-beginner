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
