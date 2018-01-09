import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    public par:any;
    transform(array: Array<string>, args: string): Array<string> {
        console.log(args);
        array.sort((a: any, b: any) => {
            if ( a._id < b._id ){
                return -1;
            }else if( a._id > b._id ){
                return 1;
            }else{
                return 0;	
            }
        });
        return array;
      }
    // transform(value:Array<any>, par:any) {
    //     // value.sort(this.compare);
    //     // debugger;
    //     return value;
    // }
    // compare(a, b) {

    //     // Use toUpperCase() to ignore character casing
    //     const genreA = new Date(a[this.par]);
    //     const genreB = new Date(b[this.par]);
        
    //     let comparison = 0;
    //     if (genreA > genreB) {
    //       comparison = 1;
    //     } else if (genreA < genreB) {
    //       comparison = -1;
    //     }
    //     return comparison;
    //   }
}