import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

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
    getworkflowsList(): Observable<any>{
        return this.service.get("http://localhost:62770/api/GetWorkFlowList");
    }
}
