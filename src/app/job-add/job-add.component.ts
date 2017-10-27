import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { JobService } from '../services/job.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  form: FormGroup;
  userIsAuthenticated: Boolean = false;

  contractTypes: any[] = [
    {id: 1, name: 'stage', value: 'internship'},
    {id: 2, name: 'interim', value: 'temp'},
    {id: 3, name: 'CDD',  value: 'fixed-term'},
    {id: 4, name: 'CDI', value: 'permanent'},
    {id: 5, name: 'independant', value: 'freelance'},
  ];
  currencies: any[] = [
    {id: 1, name: 'euros', value: 'EU', symbol: '€'},
    {id: 2, name: 'livres sterling', value: 'POUNDS', symbol: '£'},
    {id: 3, name: 'francs CFA', value: 'CFA', symbol: 'CFA'},
    {id: 4, name: 'dollars canadien', value: 'CAD', symbol: '$'}
  ];

  statuses: any[] = [
    {id: 1, name: 'cadre', value: 'executive'},
    {id: 1, name: 'employé', value: 'employee'}
  ];

  experiencies: any[] = [
    { id: 1, name: 'junior', value: 'junior'},
    { id: 2, name: 'medior', value: 'medior'},
    { id: 3, name: 'senior', value: 'senior'}
  ];

  areas: any[] = [
    {id: 1, name: 'aucun déplacements', value: 'none'},
    {id: 2, name: 'déplacements régionaux', value: 'region'},
    {id: 3, name: 'déplacements nationaux', value: 'nation'},
    {id: 4, name: 'déplacements internationaux', value: 'international'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkUserIsAuthenticated();

    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      company: '',
      city: '',
      zipcode: '',
      description: '',
      contract: '',
      salary: null,
      currency: '',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field: '',
      publishdate: new Date(),
      lastupdate: new Date()
    });
  }



  createJob(formData) {
    const token = JSON.parse(localStorage.getItem('authData')).token;
    this.jobService.addJob(formData, token)
      .subscribe();
    this.form.reset();
  }

  checkUserIsAuthenticated() {
    // console.log("this.authService.isUserAuthenticated", this.authService.isUserAuthenticated);
    if (this.authService.isUserAuthenticated()) {
      return this.userIsAuthenticated = true;
    }
  }

}
