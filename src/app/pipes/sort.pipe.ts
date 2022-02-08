import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: number[], orderBy: 'asc' | 'desc' = 'desc'): number[] {
    return orderBy === 'asc' ? value.sort((a, b) => a - b) : value.sort((a, b) => b - a);
  }
}
