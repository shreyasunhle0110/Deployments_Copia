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
    baseUrl = "http://deploymentsiteapi.copiacs.com/api/";
    // baseUrl = "http://localhost:62770/api/";
    workflowRegister(obj): Observable<any> {
        return this.service.post(this.baseUrl + "Workflow", obj);
    }
    getworkflowsList(AccessCode,CompanyId): Observable<any>{
        const params = new HttpParams()
                .set('AccessCode',AccessCode)
                .set('CompanyId',CompanyId)

        return this.service.get(this.baseUrl + "GetWorkFlowList",{params:params});
    }
    getdepoymentSpeed(): Observable<any>{
        return this.service.get(this.baseUrl + "GetDeploymentSpeedList");
    }

    workflowDetails(workflowId) {
        const params = new HttpParams()
            .set('workflowId', workflowId)
        return this.service.get(this.baseUrl + "Workflow", {params: params})
    }

    updateWorkflowDetails(obj) {
        return this.service.post(this.baseUrl + "updateWorkflow", obj);
    }

    deploymentWorkflow(obj) {
        return this.service.post(this.baseUrl + "workflowDeployment", obj);
    }

}
