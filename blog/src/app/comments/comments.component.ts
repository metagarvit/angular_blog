import { Component, Input , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { CreateComment } from '../interfaces/CreateComment';
import { MessageService } from 'primeng-lts/api';
import { ToastTrigerService } from '../services/toast-triger.service';
// import {MessageService} from 'primeng-lts/api';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  implements OnInit{


  constructor(private homeService: HomeService,public  route: ActivatedRoute
    ,private messageService: MessageService,private toastTriggerService: ToastTrigerService
    ) { }


  ngOnInit() {


    this.commentForm = new FormGroup({
      'msg': new FormControl(null, Validators.required)
    });
  }

  commentForm !: FormGroup;
  @Input() postId !: number
  @Input() data !: [
   CreateComment
  ];


  onSubmit() {
    console.log("testing");


    console.log(this.commentForm.value)
    this.homeService.createComment(this.postId,{ body : this.commentForm.value.msg}).subscribe({
      next: (res: CreateComment) => {
        console.log(res)
        this.data.push(res)
        this.commentForm.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'Comment send successfull'});
      },
      error: (err) => {
        console.log(err)
          console.log("Inside Error");
          console.log(err.error.message);
          // this.errorMessage = err.error.message
          this.toastTriggerService.triggerToast('error', 'Failure', err.message)
      }
    })

  }

}
