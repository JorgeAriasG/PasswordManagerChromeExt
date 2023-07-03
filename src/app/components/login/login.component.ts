import { LoginUser } from './../../models/loginUser-type';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private encryptionService: EncryptionService, private apiService: ApiService) {

  }

  onSubmit() {
    let user: LoginUser = {
      email: this.loginForm.controls.email.value || ' ',
      password: this.loginForm.controls.password.value || ' '
    };

    this.apiService.login(user)
      .subscribe((data: string) => {
        console.log('Login: ' , data);
      }, err => {
        console.error('Error: ', err);
      })


  }
}
