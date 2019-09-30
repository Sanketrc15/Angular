import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { SearchBookComponent } from './search-book/search-book.component';
import {FormsModule} from '@angular/forms';
import {BookCountComponent} from './book/bookcount.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { BookPipePipe } from './book-pipe.pipe';
import { BookCurrencyPipe } from './book-currency.pipe';
import {BookDeactivateService} from './book-deactivate.service';
import { HomeComponent, AboutUSComponent, DownloadComponent, AudioComponent, VideoComponent, ImagesComponent } from './search-result/home-component';


const appRoutes:Routes = [

  { path :'booklist', component: BookComponent},
  { path :'searchBook', component: SearchBookComponent},
  { path :'addBook', component: AddBookComponent, canDeactivate:[BookDeactivateService]},
  { path :'editBook/:id', component: EditbookComponent},
  { path :'home', component: HomeComponent},
  { path :'aboutus', component: AboutUSComponent},
  { path :'downloads', component: DownloadComponent, children:
  [{ path :'audio', component: AudioComponent},
  { path :'video', component: VideoComponent},
  { path :'images', component: ImagesComponent},
  ]},
  { path : '' ,redirectTo:'/home' , pathMatch:'full'}


];


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    SearchBookComponent,
    BookCountComponent,
    SearchResultComponent,
    AddBookComponent,
    EditbookComponent,
    BookPipePipe,
    BookCurrencyPipe,
    HomeComponent, AboutUSComponent, DownloadComponent ,AudioComponent, VideoComponent, ImagesComponent,
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [BookDeactivateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
