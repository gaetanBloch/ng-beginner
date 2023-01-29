import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <span class="{{ value | getClass }}" >
      {{ value }}
    </span>
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
