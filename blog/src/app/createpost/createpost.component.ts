import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SelectItem } from 'primeng-lts/api';
import { Category } from '../interfaces/Categorry';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { ToastTrigerService } from '../services/toast-triger.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})



export class CreatepostComponent {
  selectedCity1 !: Category;
  cities1: SelectItem[];
  constructor(private homeService: HomeService,public router: Router, private toastTriggerService: ToastTrigerService){
    this.cities1 = [
      {label:'Select Category', value:null},
      {label:'Java', value:1},
      {label:'C', value:2},
      {label:'C', value:3},
      {label:'PHP', value:3},
      {label:'C#', value:3}
  ];
  }

  createPost !: FormGroup;

  ngOnInit() {

    this.createPost = new FormGroup({
      'title': new FormControl(null , Validators.required),
      'image': new FormControl(null , Validators.required),
      'description': new FormControl(null , Validators.required),
      'category': new FormControl(null , Validators.required),

    }
    );

  }

  fileToUpload: File | null = null;

  onSubmit() {
    console.log(this.createPost.value)



    this.homeService.createPost(this.createPost.value , this.fileToUpload!!).subscribe({
      next: (res: any) => {
        console.log(res)

        this.toastTriggerService.triggerToast('success', 'Success', 'Post created!!')
        this.router.navigate([''])
      },
      error: (err) => {
        console.log("Error ->>>" + err)
          console.log("Inside Error");
          this.toastTriggerService.triggerToast('error', 'Failure', err.message)
      }
    })
  }



  onChangeFile(event: any) {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.fileToUpload = file;
      }


  }

  }



