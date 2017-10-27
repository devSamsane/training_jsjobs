import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  storage: any = null;
  isAuthenticated: Boolean = false;
  welcomeMessage: String = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.refreshFlags(true);
    }
  }

  login(authData) {
    this.authService.login(authData)
      .subscribe(
        data => this.handleLoginSuccess(data),
        error => this.handleLoginFailure(error)
      );
  }

  handleLoginSuccess(data) {
    console.log('success', data);
    this.storage = data;
    this.refreshFlags(true);
    localStorage.setItem('authData', JSON.stringify(data));
  }

  handleLoginFailure(error) {
    console.error('echec', error);
  }

  refreshFlags(value) {
    this.isAuthenticated = value;
    this.welcomeMessage = 'Bienvenue !';
  }
}
