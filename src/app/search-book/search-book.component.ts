import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {

  private bookid :number;
  private childbookid: number;
  errormessage:string;

  constructor() { }

  ngOnInit() {
  }

   GetErrorMessage(message:string)
   {
     this.errormessage = message;
   }

  PassToChild()
  {
    this.childbookid = this.bookid;
  }


  
  
}
