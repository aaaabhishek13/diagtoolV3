import { Component, OnInit } from '@angular/core';
import { Guid } from './guid';
import { ToolService } from '../../tool.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-guids',
  templateUrl: './guids.component.html',
  styleUrls: ['./guids.component.css']
})
export class GuidsComponent implements OnInit {

  jobid: string;
  date: string;
  guid: Guid[] = new Array();
  list = [];
  isSelected: boolean = false;
  testPage: boolean = false;
  selectedGuid: Guid;
  selectedTest: number;
  fileCount: number = 0;
  deleteFlag: boolean = false;
  toDeleteId: number;
  rejectFlag: boolean = false;
  toRejectId: number;
  fileName: string;
  fileContent: string;

  constructor(private route: ActivatedRoute, private service: ToolService, private router: Router, public snackBar: MatSnackBar) {
    $(document).ready(function () {
      $("#deleteModal").on('hidden.bs.modal', function () {
        this.deleteFlag = false;
        this.toDeleteId = 0;
      });
      $("#rejectModal").on('hidden.bs.modal', function () {
        this.rejectFlag = false;
        this.toRejectId = 0;
      });
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.jobid = params['job'];
      this.date = params['date'];
      this.service.getAllCh(this.jobid).subscribe((response => {
        this.list = response['response'];
        for (var index = 0; index < this.list.length; index++) {
          var element = this.list[index];
          this.guid.push(new Guid(this.jobid, element['rmaId'], element['id'], element['physicalInspectionResult'], Guid.getRejectReason(element['rejectReason']), Guid.getTime(element['completionTime']), element['ReTestResult'].testOutcome, element['testBenchResults'], element['ReTestResult'].reTestResults));
        }

      }));
    });
  }

  public routeJob() {
    this.router.navigate(['']);
  }

  public routeCh() {
    this.isSelected = false;
    this.testPage = false;
  }

  public getTestName(id: number) {
    return Guid.getTestName(id);
  }

  public openImage() {
    $('#imageModal').modal();
  }

  public getResultType(i: number) {
    if (i == 1) return "PASS";
    else if (i == 2) return "FAIL";
    else return "-";
  }

  public routeResults() {
    this.isSelected = true;
    this.testPage = false;
  }

  public displayTestPage(i: number) {
    this.isSelected = false;
    this.testPage = true;
    this.selectedTest = i;
  }

  public displayResults(id: number) {
    var i = this.getGuid(id);
    this.selectedGuid = this.guid[i];
    this.isSelected = true;
  }

  public addNewCh(form) {
    if (this.fileCount == 0) {
      this.snackBar.open('Select the input CSV !', 'ok', {
        duration: 5000,
      });
      return;
    }
    console.log(form.value);
    var csvRecordsArray = this.fileContent.split(/\r\n|\n/);
    console.log(csvRecordsArray);
    form.reset();
  }

  public onAccept(id: number) {
    var i = this.getGuid(id);
    //this.service.acceptCh(this.guid[i].guid,JSON.stringify({'physicalInspectionResult':1})).subscribe((response=>{}));
    this.guid[i].physicalInspectionResult = 1;//comment it later
  }

  public getGuid(id: number) {
    for (var i = 0; i < this.guid.length; i++) {
      if (id == this.guid[i].id)
        return i;

    }
  }

  public onReject(id: number) {
    var i = this.getGuid(id);
    if (this.guid[i].rejectSelection == 'Select') {
      this.snackBar.open('Select a Reject Reason !', 'ok', {
        duration: 3000,
      });
      return;
    }
    $("#rejectModal").modal();
    this.rejectFlag = true;
    this.toRejectId = i;
  }

  public rejectGuid(form) {

    console.log(form.value);
    form.reset();
    if (this.rejectFlag) {
      // this.service.rejectCh(this.guid[i].guid,JSON.stringify({'physicalInspectionResult':2,'rejectReason':Guid.getRejectReasonId(this.guid[i].rejectSelection)})).subscribe((response=>{}));
      this.guid[this.toRejectId].physicalInspectionResult = 2;//comment it later
      this.guid[this.toRejectId].rejectReason = this.guid[this.toRejectId].rejectSelection;//comment it later
    }
    $('#rejectModal').modal('hide');
    this.snackBar.open('The CH was successfully Rejected', 'ok', {
      duration: 5000,
    });
  }

  public onDelete(id: number) {
    $("#deleteModal").modal();
    var i = this.getGuid(id);
    this.deleteFlag = true;
    this.toDeleteId = i;
  }

  public deleteGuid() {
    if (this.deleteFlag) {
      this.guid = this.guid.filter(item => item !== this.guid[this.toDeleteId]);
    }
    $('#deleteModal').modal('hide');
    this.snackBar.open('The CH was successfully Deleted', 'ok', {
      duration: 5000,
    });
  }


  public saveDetails(form){

  }

  public fileChange(event) {
    var fileList: FileList = event.target.files;
    this.fileCount = fileList.length;
    if (this.fileCount > 0) {
      this.fileToText(fileList[0], (fileName, text) => {
        this.fileName = fileName;
        this.fileContent = text;
      });
    }
  }

  public fileToText(file, callback) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      callback(file.name, reader.result);
    };
  }

}
