import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/auth.service';
import { ICreateUser } from 'src/app/models/ICreateUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private apiService: ApiService) {}

  onSubmit() {
    let user: ICreateUser = {
      firstname: this.signUpForm.controls.firstname.value || '',
      lastname: this.signUpForm.controls.lastname.value || '',
      phoneNumber: parseInt(this.signUpForm.controls.phoneNumber.value || ''),
      email: this.signUpForm.controls.email.value || '',
      password: this.signUpForm.controls.password.value || ''
    }

    this.apiService.createUser(user)
      .subscribe(res => {
        console.log('CreateUser: ' , res);
      }, err => {
        console.error('Error: ' , err);
      })
  }

}
