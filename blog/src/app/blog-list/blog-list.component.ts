import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { BlogDetails } from '../interfaces/BlogDetails';
import { ToastTrigerService } from '../services/toast-triger.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  response: BlogDetails[] = [];
  constructor(private homeService: HomeService,private toastTriggerService: ToastTrigerService) {

  }

  ngOnInit(): void {

    this.homeService.myBlogList().subscribe({
      next: (res: Array<BlogDetails>) => {
        console.log(res)
        this.response = res
      },
      error: (err) => {
        console.log("Error ->>>" + err)
        console.log("Inside Error");
      }
    })
  }

  deletePost(id: number, idx: number) {
    this.homeService.deletePost(id).subscribe({
      next: (res: string) => {
        console.log(res)
        this.response.splice(idx, 1)
       this.toastTriggerService.triggerToast('success', 'Success', 'Deleted Successful')
      },
      error: (err) => {
        console.log("Error ->>>" + err)
        console.log("Inside Error");
        this.toastTriggerService.triggerToast('error', 'Failure', err)
      }
    })
  }
}
