import { Pipe, PipeTransform } from '@angular/core';
import { tick } from '@angular/core/testing';
import { createHostListener } from '@angular/compiler/src/core';

@Pipe({
  name: 'availability'
})
export class BookPipePipe implements PipeTransform {

  transform(value: String): any 
  {
    console.log(value);
        if(value)
        {
          return 'assets/images/tick.jfif';
        }
        else
        {
        return 'assets/images/cross.png';
        }
  }

}
