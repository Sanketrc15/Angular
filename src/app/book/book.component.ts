import { Component, Input, SimpleChanges,Output,EventEmitter} from '@angular/core';
// import { AppComponent } from '../app.component';
import {BookService} from '../book.service';
import {Router} from '@angular/router';
// import{ Observable} from 'rxjs';
// import {from , of} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent 
{
  //@Input()
//  book_name:string;

  showbooks:boolean = true;
  selectedBookCountRadioButton: string="All";

  @Output()
  editBookEvent:EventEmitter<Number> = new EventEmitter<Number>();

  private books:any[];
  private numbers : number []= [1,2,3,4,5,6,7];

  private currencies : String []= ['INR','USD','EUR','MUR','JPY'];
  private currency: String = 'INR';
  

  constructor(private booksvc: BookService,private router: Router)
  {
    this.showBooks();
    //console.log("books123");
    //this.books = this.booksvc.GetAllBooks();
  }

  editBook(bookId: number)
  {
    this.router.navigate(['/editBook' ,bookId]);
  }

  DeleteBook(bookId: number)
  {
    this.booksvc.DeleteBookByIdAsync(bookId).subscribe();
    this.showBooks();
  }

  

  onBookCountRadioButtonChange( selectedRadioButtonValue: string ) : void 
  {
      this.selectedBookCountRadioButton = selectedRadioButtonValue;  
  }

  toggleDetails(): void 
  {
    this.showbooks = !this.showbooks;
    this.showBooks();
  }

  showBooks(): void{
    this.booksvc.GetAllBooksAsync().subscribe(data => 
      { 
          //console.log("books");
          this.books = data;
          console.log(data);
          
      }) ;
  }

    ngOnChanges(){
      console.log(this.currency);
    }


  // getTotalBookCount() : number {
  //     return this.books.length ;
  // }

  // getTotalProgrammingBookCount() : number {
  //   return this.books.filter(b=> b.Category === "Computer Programming").length;
  // }

  // getTotalNovelBookCount() : number {
  //   return this.books.filter(b=> b.Category === "Novel").length;
  // }

}