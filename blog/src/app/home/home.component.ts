import { Component  , OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { HomeResponse } from '../interfaces/HomeResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  response : HomeResponse = {} as HomeResponse

  constructor(private homeService: HomeService){

  }

  ngOnInit(): void {

    this.homeService.homeResponse().subscribe({
      next: (res: HomeResponse) => {
        console.log(res)
      this.response = res
      },
      error: (err) => {
        console.log("Error ->>>" + err)
          console.log("Inside Error");
      }
    })
  }


}
