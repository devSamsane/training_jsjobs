import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(formData) {
    return this.authService.register(formData)
      .subscribe(
        data => this.handleRegisterSuccess(data),
        error => this.handleRegisterFailure(error)
      );
  }

  handleRegisterSuccess(data) {
    console.log('success', data);
    this.router.navigate(['/']);
  }

  handleRegisterFailure(error) {
    console.error('echec', error);
  }

}
