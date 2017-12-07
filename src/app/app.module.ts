import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDashboardComponent } from './jobs/jobs-dashboard/jobs-dashboard.component';
import { GuidsComponent } from './jobs/guids/guids.component';
import { RouterModule } from '@angular/router';
import { ToolService } from './tool.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    JobsComponent,
    JobsDashboardComponent,
    GuidsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: '', component: JobsComponent, children: [{ path: '', component: JobsDashboardComponent },
        { path: 'guid', component: GuidsComponent }]
      },
      {
        path: 'reports', component: ReportsComponent

      }
    ])
  ],
  providers: [ToolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
