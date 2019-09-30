import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';

import { AddBookComponent } from './add-book/add-book.component';

@Injectable({
  providedIn: 'root'
})
export class BookDeactivateService implements CanDeactivate<AddBookComponent>{

  constructor() { }
  
  canDeactivate(component: AddBookComponent): boolean {

    if(component.createAddForm.dirty){
      return confirm("Are you sure you want to navigate??");
    }

    return true;
  }

}
