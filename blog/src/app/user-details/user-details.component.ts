import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit  {

  udpateDetails !: FormGroup;

  ngOnInit() {

    this.udpateDetails = new FormGroup({
      'username': new FormControl(null , Validators.required),
      'email': new FormControl(null , Validators.required),
      'password': new FormControl(null , [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),

      'confirm_password': new FormControl(null , [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),


    }
    , { validators: this.passwordMatchingValidatior });

  }

  onSubmit() {
    console.log(this.udpateDetails.value)
  }

    passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };
}
