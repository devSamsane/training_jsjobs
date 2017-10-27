import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodedToken = null;
  isAdmin: Boolean = false;
  user: String = '';

  constructor(private authService: AuthService, private jobService: JobService) { }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      const storage = JSON.parse(localStorage.getItem('authData'));
      this.decodedToken = this.authService.decode(storage.token);
      console.log(this.decodedToken);

      if (this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
    }

    this.user = this.decodedToken.email;
    if (this.isAdmin) {
      this.getAdsForAdmin();
    } else {
      this.getAds(this.user);
    }
  }

  getAds(email) {
    this.jobService.getJobsByUser(email)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
  }

  getAdsForAdmin() {
    this.jobService.getJobs()
      .subscribe(
        data => this.displayAds(data),
        error => console.log(error)
      );
  }

  displayAds(data) {
    console.log(data);
  }
}
