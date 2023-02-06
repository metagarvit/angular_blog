import { Component, Input , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent  implements OnInit{


  constructor(private homeService: HomeService,public  route: ActivatedRoute) { }


  ngOnInit() {


    this.commentForm = new FormGroup({
      'msg': new FormControl(null, Validators.required)
    });
  }

  submit = false
  commentForm !: FormGroup;
  @Input() postId !: number
  @Input() data !: [
    {
      "id": number,
      "name": string,
      "email": string,
      "body": string
    }
  ];


  onSubmit() {
    this.submit = true
    console.log(this.commentForm.value)
    localStorage.clear()
    this.homeService.createComment(this.postId,this.commentForm.value).subscribe({
      next: (res: string) => {
        console.log(res)

        // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
      },
      error: (err) => {
        console.log(err)
          console.log("Inside Error");
          console.log(err.error.message);
          // this.errorMessage = err.error.message
      }
    })

  }

}
