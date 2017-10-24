import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {
  jobs: any[] = [];
  jobsSubject = new Subject();
  initialJobs: any[] = [];

  constructor(private http: Http) { }

  getJobs() {
    if (this.jobs.length > 0 && this.initialJobs.length > 0) {
      return Observable.of([...this.jobs, ...this.initialJobs]);
    } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
      return this.http.get('data/jobs.json')
        .map(res => res.json())
        .do(data => {
          this.initialJobs = data;
          this.jobs = [...this.jobs, ...this.initialJobs];
        });
    } else {
      return this.http.get('data/jobs.json')
        .map(res => res.json())
        .do(data => this.initialJobs = data);
    }
  }

  addJob(job) {
    job.id = Date.now();
    this.jobs = [job, ...this.jobs];
    return this.jobsSubject.next(job);
  }
}
