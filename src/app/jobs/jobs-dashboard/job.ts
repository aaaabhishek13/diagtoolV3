/*
* Copyright (c) 2016-2017
* Code written by: Toshiba Software India Pvt. Ltd.
* This file is part of Toshiba test and Diagnostics portal
* Proprietary and confidential
* All rights reserved
*/

/*
* Helper class which stores the structure of a particular Job
*/

export class Job {
    public id: number;              
    public jobId: string;
    public creationTime: string;

    constructor(id: number, jobID: string, creationTime: string) {
        this.id = id;
        this.jobId = jobID;
        this.creationTime = creationTime;

    }
}