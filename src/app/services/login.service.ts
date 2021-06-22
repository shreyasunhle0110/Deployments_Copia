import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/user.model';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService{
    userResponse: any = "default value";
    constructor(private service: HttpClient) {
        super();
    }
    authenticate(userEmail: string, AuthCode: string): Observable<any> {
        const params = new HttpParams()
            .set('UserEmail', userEmail)
            .set('AuthCode',AuthCode)
        // let params1 = new HttpParams().set('UserEmail',userEmail)
        // let params2 = new HttpParams().set('AuthCode',AuthCode)
        this.userResponse = this.service.get("http://localhost:62770/api/GetUserDetails",{params:params})
        return this.userResponse
    }
}
