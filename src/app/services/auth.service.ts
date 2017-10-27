import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
    // console.log("!!localStorage.getItem('authData')", !!localStorage.getItem('authData'));
    return !!localStorage.getItem('authData'); // les 2 !! cast la valeur en boolean
  }

  logout() {
    localStorage.removeItem('authData');
  }

  register(data) {
    console.log(data);
    return this.http.post(`${this.AUTH_URL}register`, data)
      .map(res => res.json());
  }

  addAuthorizationHeader(token) {
    const authorizationHeader = new Headers({
      'Authorization': 'Bearer ' + token
    });
    return new RequestOptions({
      headers: authorizationHeader
    });
  }

  decode(token) {
    return jwtDecode(token);
  }
}
