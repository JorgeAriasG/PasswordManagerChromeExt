import { ICreateUser } from './../models/ICreateUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url: string = 'http://localhost:5096';
  url: string = 'https://localhost:7128';
  constructor(private http: HttpClient) { }

  login(user: LoginUser) {
    return this.http.post<string>(this.url + '/api/v1/User/Login', user);
  }

  createUser(user: ICreateUser) {
    return this.http.post(this.url + '/api/v1/User', user);
  }
}
