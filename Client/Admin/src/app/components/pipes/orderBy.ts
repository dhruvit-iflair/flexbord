import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    public par:any;
    transform(value:Array<any>, par:any) {
        // value.sort(this.compare);
        // debugger;
        return value;
    }
    compare(a, b) {

        // Use toUpperCase() to ignore character casing
        const genreA = new Date(a[this.par]);
        const genreB = new Date(b[this.par]);
        
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
}