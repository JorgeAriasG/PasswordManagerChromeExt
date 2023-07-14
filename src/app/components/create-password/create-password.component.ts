import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IPassword } from 'src/app/models/IPassword';
import { EncryptionService } from 'src/app/services/encryption.service';
import { PasswordService } from 'src/app/services/password.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent {
  createPasswordForm = new FormGroup({
    site: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private passwordService: PasswordService, private encryptionService: EncryptionService, private router: Router, private route: ActivatedRoute) {}

  onSubmit() {
    let password: IPassword = {
      site: this.createPasswordForm.controls.site.value || '',
      username: this.createPasswordForm.controls.username.value || '',
      pword: this.encryptionService.encrypt(this.createPasswordForm.controls.password.value || '')
    };

    console.log('NewPassObject: ' , password);

    this.passwordService.createPassword(password, localStorage.getItem(environment.Constants.LocalStorage.userId) || '')
      .subscribe((data: any) => {
        if(data) {
          console.log('NewPword: ' , data);
          this.router.navigate(['password-list']);
        }
      }, err => {
        console.error('Error: ', err);
      })
  }
}
