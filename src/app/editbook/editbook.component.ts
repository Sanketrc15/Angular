import { Component, OnInit, Input } from '@angular/core';
import {BookService} from '../book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  // @Input()
  // private editedId: number;

  private navigatedId: number
  private Name:string;
  private Publisher:string;
  //private category:number;
  private price:number;
  private thumbnail:string;
 // private publishDate:number;

  constructor(private svc: BookService, private activatedRoute : ActivatedRoute,private route: Router) {

      this.activatedRoute.params.subscribe( params => {
      
        this.navigatedId = +params['id']; 
        console.log(this.navigatedId);
        this.svc.GetBookByIdAsync(this.navigatedId).subscribe(data=>
          {
            this.bookobject = data;
            console.log(this.bookobject.Name);
          });
        });
    
   }
 
  private bookobject : any;


  editBook(){

if(this.thumbnail){
  this.bookobject.thumbnail= this.thumbnail;}
    this.svc.EditBookAsync(this.bookobject).subscribe( data=>
      {
        this.bookobject=data;
      });

    alert("Book edited");
      this.route.navigate(['/booklist']);
  }

  ngOnInit() {
  }
}
