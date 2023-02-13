import { Component  , OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { Content, HomeResponse } from '../interfaces/HomeResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

page = 0
  constructor(private homeService: HomeService){

  }
responseData : Content[] = []
  ngOnInit(): void {

    this.homeService.homeResponseByPagination(this.page).subscribe({
      next: (res: HomeResponse) => {
        console.log(res)
      this.responseData.push(... res.content)
      },
      error: (err) => {
        console.log("Error ->>>" + err)
          console.log("Inside Error");
      }
    })
  }

  onScroll(): void {
    this.homeService.homeResponseByPagination(++this.page).subscribe({
      next: (res: HomeResponse) => {
        console.log(res)
      this.responseData.push(... res.content)
      },
      error: (err) => {
        console.log("Error ->>>" + err)
          console.log("Inside Error");
      }
    })
  }


}
