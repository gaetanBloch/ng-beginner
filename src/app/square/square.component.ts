import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
      {{ value }}
  `,
  styles: [`
    :host {
      font-size: 4rem;
      &:hover {
        cursor: pointer;
      }
    }
  `],
})
export class SquareComponent {
  @Input() value?: 'X' | 'O';
}
