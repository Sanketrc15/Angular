import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input()
  searchbookid:number;

  result:any;

  @Output()
  errorevent:EventEmitter<string> = new EventEmitter<string>();

  constructor(private svc: BookService)
  {
    //console.log("CONSTRUCTOR: book id from parent is: ", this.searchbookid);
  }

  ngOnInit()
  {
    //console.log("ngOnInit: book id from parent is: ", this.searchbookid);
  }
  
  
  ngOnChanges()
  {
    console.log("ngOnChanges: book id from parent is: ", this.searchbookid);

          // this.result = allbooks.find(b => b.bookid == this.searchbookid);
          // if(this.result == undefined || this.result == null)
          // {
          //   this.errorevent.emit("Book not found!");
          // }
          
          //this.result = this.svc.GetBookById(this.searchbookid);


    this.svc.GetBookByIdAsync(this.searchbookid).subscribe( data => {
        
      this.result= data;
      this.errorevent.emit("");

    }, (error) => { 
      if(this.searchbookid){
        this.result=undefined;
      this.errorevent.emit("Book not found!");} })
    
    // if(this.result == undefined || this.result == null)
    // {
    //   //this.errorevent.emit("Book not found!");
    // }
  }


}

