import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'jsJobs';
  isAuthenticated: any = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isUserAuthenticated();
  }
}
