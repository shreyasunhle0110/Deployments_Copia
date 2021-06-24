export class WorkflowRegisterModel {
    hsbcPersonName: string;
    hsbcIntegrationManagerName: string;
    hsbcIntegrationManagerEmail: string;
    hsbcmobileNo: string;
    date: string;
    status: string;
    createdBy: string;
    companyName: string;
    companyContactName: string;
    companyEmail: string;
    companyContactNo: string;
    assignWorkflowToCompanyContact: boolean;
    sendEmailWithAuthCode: boolean;
    AuthorizationCode: string;
}

export class SysbrijUserModel {
    name: string;
    email: string;
    address: string;
    mobile: string;
    role: string;

    constructor(name, email, address, mobile, role) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.mobile = mobile;
        this.role = role;
    }
}