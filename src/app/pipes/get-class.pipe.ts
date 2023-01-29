import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getClass'
})
export class GetClassPipe implements PipeTransform {
  transform(player: 'X' | 'O' | undefined | null): string {
    return player === 'X' ? 'primary' : 'accent';
  }

}
