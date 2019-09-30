import { Component, OnInit, ViewChild } from '@angular/core';
import {BookService} from '../book.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @ViewChild('addForm',{static: true}) public createAddForm : NgForm;
  
  private id:number ;
  private name:string = '';
  private author:string;
  //private category:number;
  private price:number;
  private thumbnail:string;
  //private publishDate:number;
  private availability:string;

  constructor(private svc: BookService, private route :Router) { }
  private bookobject :any;


  AddBook()
  {
    console.log("In add");
    this.bookobject = {
      BookId: this.id,
      Name: this.name,
      Publisher: this.author,
      // category: this.category,
      Price: this.price,
      thumbnail: this.thumbnail,
     // publishDate: this.publishDate,
      InStock:this.availability,
    };

    // //validate the thumbnail extension
    // let result = this.svc.AddBookService(bookobject);
    // alert(result);

    this.bookobject.thumbnail = this.svc.changePath(this.bookobject.thumbnail);
   
    this.svc.addBookAsync(this.bookobject).subscribe( data=>
      { 
        
        if(confirm(data)){
          this.createAddForm.resetForm();
          this.route.navigate(['/home']);
        }

       

      }, (error) => {alert("Id already Exists")} );
  }

  ngOnInit() {
  }
}
  