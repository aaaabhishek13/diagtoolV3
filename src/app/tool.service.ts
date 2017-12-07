/*
* Copyright (c) 2016-2017
* Code written by: Toshiba Software India Pvt. Ltd.
* This file is part of Toshiba test and Diagnostics portal
* Proprietary and confidential
* All rights reserved
*/

import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToolService {
    constructor(private http: Http) {

    }

    public getJobsList() {
        return this.http.get('assets/rmalist.json').map((res: Response) => (res.json()));
    }

    public getAllCh(rmaid: string) {
        return this.http.get('assets/devicelist.json').map((res: Response) => (res.json()));
    }


}