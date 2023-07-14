import { environment } from '../../environments/environment';
import { ICreateUser } from '../models/ICreateUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../models/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${environment.PasswordManagerApi.url}${environment.PasswordManagerApi.version}/User`;
  constructor(private http: HttpClient) { }

  login(user: IUserLogin) {
    return this.http.post<string>(`${this.url}/Login`, user);
  }

  getHashedPass(email: string) {
    return this.http.get(`${this.url}/salted/${email}`, { responseType: 'text' });
  }

  createUser(user: ICreateUser) {
    return this.http.post(`${this.url}`, user);
  }
}
