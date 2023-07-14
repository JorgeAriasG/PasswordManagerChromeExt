import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import * as crypto  from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  privateKey: string = '123123123';
  hashedPass: string = '';
  secretPhrase: string = 'someRandomPhrase'

  constructor() { }

  hash(text: string): string {
    let salted: string = bcrypt.genSaltSync(10);
    let timestamp: Number = Date.now();
    let privateKey: string = salted + timestamp;

    this.hashedPass = bcrypt.hashSync(text, privateKey);
    return this.hashedPass;
  }

  compare(password: string, hashedPass: string): boolean {
    return bcrypt.compareSync(password, hashedPass);
  }

  encrypt(password: string) {
    return crypto.AES.encrypt(password, this.secretPhrase).toString();
  }

  decrypt(password: string): string {
    return crypto.AES.decrypt(password, this.secretPhrase).toString(crypto.enc.Utf8);
  }
}
