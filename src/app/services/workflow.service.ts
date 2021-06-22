import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { WorkflowRegisterModel } from '../model/workflow.model';

@Injectable({
    providedIn: 'root'
})
export class WorkflowService extends BaseService{
    userResponse: any = "default value";
    constructor(private service: HttpClient) {
        super();
    }
    workflowRegister(obj): Observable<any> {
        debugger;
        return this.service.post("http://localhost:62770/api/Workflow", obj);
    }
}
