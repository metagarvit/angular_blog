import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private messageService: MessageService){

  }

  

  title = 'blog';
}
