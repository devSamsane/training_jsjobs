import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobService } from './services/job.service';
import { JobAddComponent } from './job-add/job-add.component';
import { DaysAgoPipe } from './pipes/days-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddComponent,
    DaysAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
