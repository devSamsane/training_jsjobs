import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodedToken = null;
  isAdmin: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      const storage = JSON.parse(localStorage.getItem('authData'));
      this.decodedToken = this.authService.decode(storage.token);
      console.log(this.decodedToken);

      if (this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

}
