import { Injectable } from '@angular/core';
import { MessageService } from 'primeng-lts/api';

@Injectable({
  providedIn: 'root'
})
export class ToastTrigerService {

  constructor(  private messageService: MessageService ) { }

  triggerToast(  severity:string,summary : string ,details:string ){
    this.messageService.add({severity:severity, summary:summary, detail:details});
  }

}
