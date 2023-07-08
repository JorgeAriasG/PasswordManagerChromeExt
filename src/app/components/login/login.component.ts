import { IUserLogin } from '../../models/IUserLogin';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/auth.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { Router, ActivatedRoute} from '@angular/router';
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

  constructor(private encryptionService: EncryptionService, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  onSubmit() {
    let user: IUserLogin = {
      email: this.loginForm.controls.email.value || ' ',
      password: this.loginForm.controls.password.value || ' '
    };

    this.apiService.login(user)
      .subscribe((data: string) => {
        console.log('Login: ' , data);
        if(data) {
          localStorage.setItem('userId', data);
          this.router.navigate(['password-list'], { relativeTo: this.route });
        }
      }, err => {
        console.error('Error: ', err);
      })


  }
}
