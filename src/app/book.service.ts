import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http :HttpClient) { }

  // allbooks: any[] = [
  //   { Id:101 , Name:'Learning C++', Author:'Bjarne-Stroustrup',Category:'Computer Programming', Price:450.5,thumbnail:'assets/images/c++.jpg', PublishDate: '5/14/1999'},
  //   { Id:102, Name:'Game of Thrones', Author:'George Martin',Category:'Novel', Price:850.66,thumbnail:'assets/images/got.jpg',PublishDate: '7/19/1999'},
  //   { Id:103 , Name:'Java', Author:'Nick Samaylov',Category:'Computer Programming', Price:690.9, thumbnail:'assets/images/javaimg.png', PublishDate: '12/25/1978'},
  //   { Id:104 , Name:'The Hobbit', Author:'J.R.R Tolkien',Category:'Novel', Price:300.5,thumbnail:'assets/images/hobbit.jpg' , PublishDate: '9/30/1989'},
  //   { Id:105 , Name:'Drakula', Author:'Bram Stoker',Category:'Novel', Price:800, thumbnail:'assets/images/dracula.jpg', PublishDate: '2/23/2019'},
  //   { Id:106 , Name:'Python', Author:'O Reilly',Category:'Computer Programming', Price:550.23,thumbnail:'assets/images/python.jpg', PublishDate: '8/19/2016'},
  //   { Id:107 , Name:'All the Rage', Author:'Cara Hunter',Category:'Novel', Price:120, thumbnail:'assets/images/allRage.jpg', PublishDate: '1/03/2003'},
  //   { Id:108 , Name:'Pro Hadoop', Author:'Jason Venner',Category:'Computer Programming', Price:470, thumbnail:'assets/images/hadoop.png', PublishDate: '8/26/2015'},
  //   { Id:109 , Name:'ML for Beginners', Author:'Chris Sebastian', Category:'Computer Programming', Price:620 ,thumbnail:'assets/images/mi.jpg', PublishDate: '5/15/2000'}
    
  // ];

  httpOptions = {
    // headers: new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'my-auth-token',
    //   'Access-Control-Allow-Origin':'*'
    // })

    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200', // -->Add this line
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  })
  };

  // GetAllBooks(): any[]
  // {
  //   return this.allbooks;
  // }

  // GetBookById(bookid : any): any
  // {
  //   let result;
  //   result = this.allbooks.find(b => b.Id == bookid);
  //   return result;
  // }

  // AddBookService(book:any): string
  // {
  //   //check if the book id exists
  //   let result = this.allbooks.find(b => b.Id == book.id);
  //   if(result != undefined)
  //   {
  //     return "Book id: " + book.Id + " already exists";
  //   }
  //   this.allbooks.push(book);
  //   return "Book with id: " +book.Id +" added successfully";
  // }

  // DeleteBook(bookid: number): string
  // {
  //   return "NA";
  // }

  ValidateThumbnailFileExtension(filename:string): boolean
  {
    //return true if the validation is successful
    //return false if the validation fails
    return true;
  }

  // EditBookService(newbookdetails:any): string
  // {
  //   for(let i=0 ; i< this.allbooks.length ; i++)
  //   {
  //     if(this.allbooks[i].id == newbookdetails.id)
  //     {
  //       this.allbooks[i].Name = newbookdetails.Name;
  //       this.allbooks[i].Author = newbookdetails.Author;
  //       this.allbooks[i].Price = newbookdetails.Price;
  //       this.allbooks[i].Category = newbookdetails.Category;
  //       this.allbooks[i].PublishDate = newbookdetails.PublishDate;
  //       this.allbooks[i].thumbnail = newbookdetails.thumbnail;
  //       break;

  //     }
  //     return "Book with id: " +newbookdetails.bookid +" edited";
  //   }

  // }

  changePath(filename: string): string
  {
    let arr : string[];
    arr = filename.split("\\");

    filename = "assets/images/" + arr[arr.length - 1];

    return filename;
  } 

  GetAllBooksAsync( ): Observable<any> {

   return this.http.get('https://booksapi20190927045649.azurewebsites.net/books');

  }

  GetBookByIdAsync(bookid :any): Observable<any> {
    return this.http.get('https://booksapi20190927045649.azurewebsites.net/books/'+bookid);
  }


   EditBookAsync(book :any): Observable<any> {
    return this.http.put('https://booksapi20190927045649.azurewebsites.net/editbook/'+book.BookId, book);
   }

   
   addBookAsync(book :any ): Observable<any> {
    return this.http.post('https://booksapi20190927045649.azurewebsites.net/addbook', book);
  }

   DeleteBookByIdAsync(bookid :any): Observable<any> {
  
        return this.http.delete('https://booksapi20190927045649.azurewebsites.net/deletebook/'+bookid);
  }
}
