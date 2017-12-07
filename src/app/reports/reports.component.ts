import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public pieChartLabels:string[] = ['Sim test', 'Led test', 'zigbee test'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  public doughnutChartLabels:string[] = ['Sim test', 'Led test', 'zigbee test'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
