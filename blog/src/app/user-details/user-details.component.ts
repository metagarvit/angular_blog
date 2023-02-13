import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastTrigerService } from '../services/toast-triger.service';
import { UserDetails } from '../interfaces/UserReponse';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  response: UserDetails
  flagPassword = false
  constructor(private authService: AuthService, public router: Router, private toastTriggerService: ToastTrigerService) {
    this.response = {

      name: '',
      profileImage: '',
      username: '',
      email: '',
      roles: [
        { name: '' }
      ]

    }
  }
  udpateDetails !: FormGroup;


  ngOnInit() {

    this.udpateDetails = new FormGroup({
      'oldPassword': new FormControl(null, Validators.required),
      'newPassword': new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),

      'confirm_password': new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),


    }
      , { validators: this.passwordMatchingValidatior });


    this.authService.userDetails().subscribe({
      next: (res: UserDetails) => {
        console.log(res)
        this.response = res
      },
      error: (err) => {
        console.log(err)
        console.log("Inside Error");
        console.log(err.error.message);
        this.toastTriggerService.triggerToast('error', 'Failure', err.message)
      }
    })


  }
  changePassword() {
    this.flagPassword = !this.flagPassword
  }
  onSubmit() {
    console.log(this.udpateDetails.value)
    this.authService.changePassword(this.udpateDetails.value).subscribe({
      next: (res: string) => {
        this.udpateDetails.reset()
        this.flagPassword = false
        this.toastTriggerService.triggerToast('success', 'Successful', res)
      },
      error: (err) => {
        console.log(err)
        console.log("Inside Error");
        console.log(err.error.message);
        this.toastTriggerService.triggerToast('error', 'Failure', err.error.message)
      }
    })
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirm_password');

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };



}
