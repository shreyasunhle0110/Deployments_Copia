import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http'
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
        return this.service.post("http://localhost:62770/api/Workflow", obj);
    }

    workflowDetails(companyId) {
        const params = new HttpParams()
            .set('companyId', companyId)
        return this.service.get("http://localhost:62770/api/Workflow", {params: params})
    }
}
