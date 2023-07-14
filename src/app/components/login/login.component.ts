import { IUserLogin } from '../../models/IUserLogin';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private encryptionService: EncryptionService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    if(localStorage.getItem('userId')) {
      this.router.navigate(['password-list'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    let user: IUserLogin = {
      email: this.loginForm.controls.email.value || '',
      password: this.loginForm.controls.password.value || ''
    };

    this.authService.getHashedPass(user.email)
      .subscribe((data: string) => {
        let hashedPass = data;
        let userExists = this.encryptionService.compare(user.password, hashedPass)
        if(userExists) {
          user.password = hashedPass;
          console.log("EXISTS!: " , user);
          this.login(user);
        };
      }, err => {
        console.error('Error: ' , err);
      })
  }

  login(user: IUserLogin) {
    this.authService.login(user)
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
