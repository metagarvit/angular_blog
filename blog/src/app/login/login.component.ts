import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '../interfaces/UserReponse';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ""
  loginForm !: FormGroup;
  constructor(private authService: AuthService,public  route: ActivatedRoute) { }
  submit = false


  ngOnInit() {

    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null,Validators.required),
    });

    // [
    //   (c: AbstractControl) => Validators.required(c),
    //   Validators.pattern(
    //     /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    //   ),
    // ]
  }

  onSubmit() {
    this.submit = true
    console.log(this.loginForm.value)
    localStorage.clear()
    this.authService.userLogin(this.loginForm.value).subscribe({
      next: (res: UserResponse) => {
        console.log(res)
        this.authService.saveToken(res.accessToken)
        window.location.href = "/"

      },
      error: (err) => {
        console.log(err)
          console.log("Inside Error");
          console.log(err.error.message);
          this.errorMessage = err.error.message
      }
    })

  }

}
