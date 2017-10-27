import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class JobService {
  jobs: any[] = [];
  jobsSubject = new Subject();
  initialJobs: any[] = [];
  API_URL: String = 'http://localhost:4201/api/';
  searchResultSubject = new Subject();

  constructor(private http: Http, private authService: AuthService) { }

  getJobs() {
    return this.http.get(this.API_URL + 'jobs')
      .map(res => res.json());
  }

  getJobsByUser(email) {
    console.log(`${this.API_URL}jobs/${email}`);
    return this.http.get(`${this.API_URL}jobs/${email}`)
      .map(res => res.json());
  }

  addJob(job, token) {
    job.id = Date.now();
    const requestOptions = this.authService.addAuthorizationHeader(token);

    return this.http.post(this.API_URL + 'jobs', job, requestOptions)
      .map(res => {
        console.log(res);
        this.jobsSubject.next(job);
      });
  }

  getJob(id) {
    return this.http.get(this.API_URL + 'jobs/' + id)
      .map(res => res.json());
  }

  searchJob(criteria) {
    console.log(criteria);
    return this.http.get(`${this.API_URL}search/${criteria.term}/${criteria.place}`)
      .map(res => res.json())
      .do(res => this.searchResultSubject.next(res));
  }
}
