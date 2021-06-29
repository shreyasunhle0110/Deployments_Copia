import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/user.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class FileService extends BaseService {
    userResponse: any = "default value";
    API_URL = environment.baseApiUrl;
    constructor(private service: HttpClient) {
        super();
    }

    baseUrl = "http://deploymentsiteapi.copiacs.com/api/";
    // baseUrl = "http://localhost:62770/api/";
    
    GetHelpFileList(): Observable<any> {
  
        this.userResponse = this.service.get(this.baseUrl+"GetHelpFileList")
        debugger;
        return this.userResponse
    }
    GetTestFileList(): Observable<any> {

        this.userResponse = this.service.get(this.baseUrl + "GetTestFileList")
        debugger;
        return this.userResponse
    }
}
