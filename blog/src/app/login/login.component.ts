import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from '../interfaces/UserReponse';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng-lts/api';
import { ToastTrigerService } from '../services/toast-triger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ""
  loginForm !: FormGroup;
  constructor(private authService: AuthService, public router: Router, private toastTriggerService: ToastTrigerService) { }
  submit = false


  ngOnInit() {
    localStorage.clear()
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
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

    this.authService.userLogin(this.loginForm.value).subscribe({
      next: (res: UserResponse) => {
        console.log(res)
        this.authService.saveToken(res.accessToken)
        let flag = false
        for (var values of res.userDetailsDto.roles) {
          console.log(values);

          if (values.name == 'ROLE_ADMIN') {
            flag = true
          }
        }
        this.authService.saveRole(flag.toString())
        this.toastTriggerService.triggerToast('success', 'Success', 'Logged In ')
        this.router.navigate([''])
      },
      error: (err) => {
        console.log(err)
        console.log("Inside Error");
        console.log(err.error.message);
        this.errorMessage = err.error.message
        this.toastTriggerService.triggerToast('error', 'Failure', err.message)
      }
    })

  }

}
