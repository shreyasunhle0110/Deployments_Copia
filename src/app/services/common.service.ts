import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SampleModel } from '../model/sample.model';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CommonService extends BaseService {

    private IS_LOGGED_IN = 'isLoggedIn';
    private subject = new Subject<any>();
    constructor(private service: HttpService, private router: Router) {
        super();
    }

    public findAllSampleData(): SampleModel {
        // fe - api post/get call
        // res / err
        // model set
        // return model
        // ...
        const obj = new SampleModel();
        obj.id = '1';
        obj.name = 'abc';
        obj.displayCreatedAt = '10-10-2020'; // momentjs
        return obj;
    }

    findAllUsers() {
        return this.service.get('api/employee');
    }

    public getLocalStorageItem(key: string): string {
        return localStorage.getItem(key);
    }

    public setLocalStorageItem(key: string, value: string): void {
        localStorage.setItem(key, value);
        
    }

    public removeLocalStorageItem(key: string): void {
        localStorage.removeItem(key);
    }
    public clearLocalStorage(): void {
        localStorage.clear();
    }

    public isUserLoggedIn(key: string): boolean {
        const data = this.getLocalStorageItem(this.IS_LOGGED_IN);
        let flag = false;
        if (data) {
            flag = true;
        }
        return flag;
    }
    public loggedOut(): void {
        this.clearLocalStorage();
        this.redirectToPath('', true)

    }

    public redirectToPath(path: string, isPageRefresh: boolean): void {
        if (isPageRefresh) {
            window.location.href = path;
        }
    }
    public onButtonClick(): void {
        this.subject.next();
    }
    public getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

}