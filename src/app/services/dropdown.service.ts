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

    inputFileTypeDropdown() {
        return this.service.get("http://localhost:62770/api/inputFileTypeDropdown")
    }

    encryptionDropdown() {
        return this.service.get("http://localhost:62770/api/encryptionDropdown")
    }

    paymentTypeMasterDropdown() {
        return this.service.get("http://localhost:62770/api/paymentTypeDropdown")
    }

    workflowStatusMasterDropdown() {
        return this.service.get("http://localhost:62770/api/workflowStatusDropdown")
    }

    companyUserAutocomplete() {
        return this.service.get("http://localhost:62770/api/companyUsetAutocomplete")
    }
}