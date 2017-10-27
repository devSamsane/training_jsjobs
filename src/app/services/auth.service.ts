import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  AUTH_URL = 'http://localhost:4201/auth/';

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post(this.AUTH_URL + 'login', credentials)
      .map(res => res.json());
  }

  isUserAuthenticated() {
    return localStorage.getItem('authData');
  }

  logout() {
    localStorage.removeItem('authData');
  }

  register(data) {
    console.log(data);
    return this.http.post(`${this.AUTH_URL}register`, data)
      .map(res => res.json());
  }

  decode(token) {
    return jwtDecode(token);
  }
}
