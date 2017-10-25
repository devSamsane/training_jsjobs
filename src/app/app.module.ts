import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobService } from './services/job.service';
import { JobAddComponent } from './job-add/job-add.component';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { ToShortDatePipe } from './pipes/to-short-date.pipe';
import { ToMoneySymbolPipe } from './pipes/to-money-symbol.pipe';
import { SearchResultComponent } from './search-result/search-result.component';

const APP_ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'jobs/add', component: JobAddComponent },
  { path: 'jobs/:id', component: JobDetailsComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddComponent,
    DaysAgoPipe,
    HomeComponent,
    JobDetailsComponent,
    AboutComponent,
    ToShortDatePipe,
    ToMoneySymbolPipe,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
