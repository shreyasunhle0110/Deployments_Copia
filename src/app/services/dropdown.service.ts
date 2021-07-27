import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class dropdownService extends BaseService {
    constructor(private service: HttpClient) {
        super();
    }

    baseUrl = "http://deploymentsiteapi.copiacs.com/api/";
    // baseUrl = "http://localhost:62770/api/";

    inputFileTypeDropdown() {
        return this.service.get(this.baseUrl + "inputFileTypeDropdown")
    }

    encryptionDropdown() {
        return this.service.get(this.baseUrl + "encryptionDropdown")
    }

    paymentTypeMasterDropdown() {
        return this.service.get(this.baseUrl + "paymentTypeDropdown")
    }

    workflowStatusMasterDropdown() {
        return this.service.get(this.baseUrl + "workflowStatusDropdown")
    }

    companyUserAutocomplete() {
        return this.service.get(this.baseUrl + "companyUsetAutocomplete")
    }
}