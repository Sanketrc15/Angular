import { Component } from '@angular/core';
import { BookComponent } from '../app/book/book.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pageheader: String = 'Welcome to Book World';
  
  bookid: number;
  //name: String = " ";

  editData (editedbookid:number){
    this.bookid=editedbookid;
  }

}
