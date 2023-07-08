import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  url: string = `${environment.PasswordManagerApi.url}${environment.PasswordManagerApi.version}/Password`;
  constructor(private http: HttpClient) { }

  getAllPasswords(userId: string) {
    return this.http.get(`${this.url}/${userId}`);
  }
}
