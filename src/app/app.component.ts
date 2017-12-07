/*
* Copyright (c) 2016-2017
* Code written by: Toshiba Software India Pvt. Ltd.
* This file is part of Toshiba test and Diagnostics portal
* Proprietary and confidential
* All rights reserved
*/

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginStatus = false;
  loginType = '';



  validate() {
    this.loginStatus = true;

  }

}
