import { Component } from '@angular/core';
import { IPassword } from 'src/app/models/IPassword';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {
  passwordList: any;

  constructor(private password: PasswordService) {
    this.getAllPasswords();
  }

  getAllPasswords() {
    let userId = localStorage.getItem('userId') || '';
    this.password.getAllPasswords(userId)
      .subscribe( res => {
        this.passwordList = res;
        console.log(this.passwordList);
      }, err => {
        console.error('Error: ' , err);
      });
  }
}



