import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails = null;
  errorMessage: String = '';
  error = null;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.jobService.getJob(id)
      .subscribe(
        data => {
          this.handleServerResponse(data);
        },
        error => {
          this.handleError(error);
        }
    );
  }

  handleServerResponse(response) {
    if (!response.success) {
      this.errorMessage = response.message;
    }

    this.jobDetails = response.job;
  }

  handleError(error) {
    console.log('handleError: ', error.statusText);
    this.error = error;
  }

}
