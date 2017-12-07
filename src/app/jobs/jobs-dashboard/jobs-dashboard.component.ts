/*
* Copyright (c) 2016-2017
* Code written by: Toshiba Software India Pvt. Ltd.
* This file is part of Toshiba test and Diagnostics portal
* Proprietary and confidential
* All rights reserved
*/

import { Component, OnInit } from '@angular/core';
import { Job } from './job';
import { Guid } from '../guids/guid';
import { ToolService } from '../../tool.service';
import { MatSnackBar } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.css']
})
export class JobsDashboardComponent implements OnInit {

  jobs: Job[] = new Array();
  deleteFlag: boolean = false;
  toDeleteJobId: string;
  jobsLength: number;
  start: number = 0;
  end: number = 5;

  constructor(private toolService: ToolService, public snackBar: MatSnackBar) {
    $(document).ready(function () {
      $("#deleteModal").on('hidden.bs.modal', function () {
        this.deleteFlag = false;
        this.toDeleteJobId = '';
      });
    });
  }

  ngOnInit() {
    this.toolService.getJobsList().subscribe((response => {
      var element = response['response'];
      this.jobsLength = element.length;
      for (var index = 0; index < element.length; index++) {
        var row = element[index];
        this.jobs.push(new Job(row.id, row.rmaNo, Guid.getTime(row.creationTime)));
      }
      //this.toolService.displayLoader(false);
    }));
  }

  // Method to create new job
  public createNewJob(form) {
    console.log(form.value);
  }

  // Method to goto next page
  public goNext() {
    if ((this.start + 5) >= this.jobsLength) {
      return false;
    }
    this.start += 5;
    this.end += 5;
  }

  // Method to goto previous page
  public goPrevious() {
    if ((this.start - 4) <= 0) {
      return false;
    }
    this.start -= 5;
    this.end -= 5;
  }

  public onDelete(jobId) {
    $("#deleteModal").modal();
    this.deleteFlag = true;
    this.toDeleteJobId = jobId;
  }

  public deleteJob() {
    if (this.deleteFlag) {
      for (var i = 0; i < this.jobs.length; i++) {

        if (this.jobs[i].jobId == this.toDeleteJobId) {
          this.jobs = this.jobs.filter(item => item !== this.jobs[i]);
        }

      }
    }
    $('#deleteModal').modal('hide');
    this.snackBar.open('The job was successfully Deleted', 'ok', {
      duration: 5000,
    });

  }

}
