import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookCurrency'
})
export class BookCurrencyPipe implements PipeTransform {

  transform(value: any, currency:any) 
  {
      if(currency == 'INR')
      {
        return value;
      }
     
      if( currency == 'USD')
      {
          return value / 70;
      }

      if(currency == 'JPY')
      {
        return value/0.65;
      }
     
      if( currency == 'EUR')
      {
          return value / 77 ;
      }
      if(currency == 'MUR')
      {
        return value/1.93 ;
      }
     

  }
}
