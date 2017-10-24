import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobService {
  jobs: any[] = [];
  jobsSubject = new Subject();

  constructor(private http: Http) { }

  getJobs() {
    return this.http.get('data/jobs.json')
      .map(res => res.json());
  }

  addJob(job) {
    job.id = Date.now();
    return this.jobsSubject.next(job);
  }
}
