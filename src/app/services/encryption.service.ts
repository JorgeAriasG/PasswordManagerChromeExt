import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  privateKey: string = '123123123';
  hashedPass: string = '';

  constructor() { }

  encryp(text: string): string {
    let salted: string = bcrypt.genSaltSync(10);
    let timestamp: Number = Date.now();
    let privateKey: string = salted + timestamp;

    this.hashedPass = bcrypt.hashSync(text, privateKey);
    return this.hashedPass;
  }

  comparePassword(password: string): any {
    console.log(
      "Compare passwords: ",
      bcrypt.compareSync(password, this.hashedPass),
    );
  }
}
