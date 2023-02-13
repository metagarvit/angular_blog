import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { BlogDetails } from '../interfaces/BlogDetails';
import { AuthService } from '../services/auth.service';
import { ToastTrigerService } from '../services/toast-triger.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  routeSub !: Subscription;

  response: BlogDetails = {} as BlogDetails



  constructor(private route: ActivatedRoute,public router: Router,  private homeService: HomeService,public  authService : AuthService , private toastTriggerService: ToastTrigerService) { }

blogId !: number

  ngOnInit() {
    this.routeSub = this.route.params.subscribe({
      next: params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id
        this.blogId  = params['id']


        this.homeService.blogDetails(params['id']).subscribe({
          next: (res: BlogDetails) => {
            console.log(res)
            this.response = res
          },
          error: (err) => {
            console.log("Error ->>>" + err)
            console.log("Inside Error");
          }
        })

      }
    });




  }

  deletePost() {
    this.homeService.deletePostByAdmin(this.blogId).subscribe({
      next: (res: string) => {
        console.log(res)
       this.toastTriggerService.triggerToast('success', 'Success', 'Deleted Successful')
       this.router.navigate([''])

      },
      error: (err) => {
        console.log("Error ->>>" + err)
        console.log("Inside Error");
        this.toastTriggerService.triggerToast('error', 'Failure', err)
      }
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
