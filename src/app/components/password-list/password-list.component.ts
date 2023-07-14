import { Component } from '@angular/core';
import { IPassword } from 'src/app/models/IPassword';
import { EncryptionService } from 'src/app/services/encryption.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {
  passwordList: any;

  constructor(private password: PasswordService, private encryptionService: EncryptionService) {
    this.getAllPasswords();
  }

  getAllPasswords() {
    let userId = localStorage.getItem('userId') || '';
    this.password.getAllPasswords(userId)
      .subscribe( (res: Array<IPassword>) => {
        res.forEach(pass => {
          console.log('Pass: ', pass);
          console.log('Decrypted: ' , this.encryptionService.decrypt(pass.pword));
          pass.pword = this.encryptionService.decrypt(pass.pword);
        })
        this.passwordList = res;
        console.log(this.passwordList);
      }, err => {
        console.error('Error: ' , err);
      });
  }
}



