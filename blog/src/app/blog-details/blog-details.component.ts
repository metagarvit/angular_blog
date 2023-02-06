import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { BlogDetails } from '../interfaces/BlogDetails';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  routeSub !: Subscription;

  response: BlogDetails = {} as BlogDetails



  constructor(private route: ActivatedRoute, private homeService: HomeService) { }



  ngOnInit() {
    this.routeSub = this.route.params.subscribe({
      next: params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id



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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
