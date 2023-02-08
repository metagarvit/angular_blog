import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastTrigerService } from '../services/toast-triger.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = ""

  constructor(private authService: AuthService, private router: Router , private  toastTriggerService: ToastTrigerService)
  {

  }

  signupForm !: FormGroup;

  ngOnInit() {
    localStorage.clear()
    this.signupForm = new FormGroup({
      'name': new FormControl(null , Validators.required),
      'username': new FormControl(null , Validators.required),
      'email': new FormControl(null , [Validators.required
        // , Validators.email
      ]),
      'password': new FormControl(null , [
        (c: AbstractControl) => Validators.required(c)
        // ,
        // Validators.pattern(
        //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        // ),
      ]),

      'confirm_password': new FormControl(null , [
        (c: AbstractControl) => Validators.required(c)
        // ,
        // Validators.pattern(
        //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        // ),
      ]),


    }
    , { validators: this.passwordMatchingValidatior });

  }

  onSubmit() {
    console.log(this.signupForm.value)
    this.authService.signUp(this.signupForm.value).subscribe({
      next: (res: any) => {
        console.log("type of ->>"+ typeof(res))
        console.log("type of ->>"+ res)

        this.toastTriggerService.triggerToast('success', 'Success',res)
        this.router.navigate(['/login'])
        // window.location.href = "/login"

      },
      error: (err) => {
        console.log(err)
          console.log("Inside Error");
          console.log(err.error.message);
          this.errorMessage = err.error.message
      }
    })
  }

    passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };
}
