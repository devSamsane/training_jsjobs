import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobService {
  jobs: any[] = [];
  jobsSubject = new Subject();
  initialJobs: any[] = [];
  API_URL: String = 'http://localhost:4201/api/';

  constructor(private http: Http) { }

  getJobs() {
    return this.http.get(this.API_URL + 'jobs')
      .map(res => res.json());
  }

  addJob(job) {
    job.id = Date.now();
    return this.http.post(this.API_URL + 'jobs', job)
      .map(res => {
        console.log(res);
        this.jobsSubject.next(job);
      });
  }

  getJob(id) {
    return this.http.get(this.API_URL + 'jobs/' + id)
      .map(res => res.json());
  }
}
