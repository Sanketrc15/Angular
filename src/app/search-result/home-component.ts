import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'

@Component({
  selector: 'home',
  template: `<br><br><div class="content" align="center">
      <h1 >In Home Component</h1></div><div class="container" >
      <img src="assets/images/home.jpg"/>
      </div>`,
     styleUrls: ['./home-component.css'],
})
export class HomeComponent {

}

@Component({
    selector: 'aboutus',
    template: '<h1 align="center">In About us Component</h1>',
  })
  export class AboutUSComponent {
  
  }

  @Component({
    selector: 'app-add-book',
    template: `<h1 align="center">In Downloads Component</h1><hr> 
                        <ul class="nav nav-tabs"> 
                        
                        <li routerLinkActive="active">
                            <a routerLink="audio" button>Audio</a>
                        </li>
                        &nbsp;&nbsp;&nbsp;

                        <li routerLinkActive="active">
                            <a routerLink="video" >Video</a>
                        </li>
                        &nbsp;&nbsp;&nbsp;

                        <li routerLinkActive="active">
                            <a routerLink="images" >Images</a>
                        </li> 
                        </ul>
                        <router-outlet></router-outlet>`
    ,
  })
  export class DownloadComponent {
  
  }

  @Component({
    selector: 'app-add-book',
    template: '<h1 align="center">In Audio Component</h1>',
  })
  export class AudioComponent {
  
  }

  @Component({
    selector: 'app-add-book',
    template: '<h1 align="center">In Video Component</h1>',
  })
  export class VideoComponent {
  
  }

  @Component({
    selector: 'app-add-book',
    template: '<h1 align="center">In Images Component</h1>',
  })
  export class ImagesComponent {
  
  }