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
    assignWorkflowToCompanyContact: number;
    AuthorizationCode: string;
    workflowId: string;
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

export class customerDataModel {
    customerName: string = "";
    profileIdWithBank: string = "";
    buildingNo: string = "";
    townName: string = "";
    postalCode: string = "";
    country: number = 0;
}

export class customerContatModel {
    contactName: string = "";
    email: string = "";
    mobileNo: string = "";
    phoneNo: string = "";
}

export class customerEntitiesModel {
    name: string;
    accountNoWithBank: string;
    buildingNo: string;
    townName: string;
    postalCode: string;
    country: string;

    constructor(name, accountNoWithBank, buildingNo, townName, postalCode, country) {
        this.name = name;
        this.accountNoWithBank = accountNoWithBank;
        this.buildingNo = buildingNo;
        this.townName = townName;
        this.postalCode = postalCode;
        this.country = country;
    }
}

export class customerERPDetailsModel {
    nameOrVersion: string = "";
    erpDetails: string = "";
}

export class customerRequirnmentsModel {
    inputFileMapping: number = 0;
    inputfileTransformation: number = 0;
    inputFileType: number = 0;
    fileEncryption: number = 0;
    h2hEncryption: number = 0;
    paymentTypesForDForward: number = 0;
}

export class installationMachineDetailsModel {
    whereSysbrijWillInstalled: number = 0;
    noOfInstallation: string = "";
    serverType: number = 0;
    ipAddress: string = "";
    serverOsVersion: string = "";
    isMachineConnectedToBankSystem: number = 0;
    inputFileFolderPath: string = "";
    inputFileFolderName: string = "";
    isMachineInternateEnabled: number = 0;
    anyFirewallRestriction: number = 0;
    firewallRestrictionDetails: string = "";
    installSoftwareRemotely: number = 0;
    remoteAccessMethod: string = "";
    moreDetails: string = "";
}

export class senderEmailDataModel {
    emailId: string = "";
    emailPassword: string = "";
    smtpHost: string = "";
    smtpPort: string = "";
    receiverEmail: string = "";
}

export class batchJobDetailsModel {
    frequency: string = "";
    setupBatchJobOnYourServer: number = 0;
}

export class workflowFormModel {
    customerData: customerDataModel;
    customerContat: customerContatModel;
    customerEntitiesList: customerEntitiesModel[];
    customerERPDetails: customerERPDetailsModel;
    customerRequirnments: customerRequirnmentsModel;
    installationMachineUATDetails: installationMachineDetailsModel;
    installationMachineProductionDetails: installationMachineDetailsModel;
    customerUserList: SysbrijUserModel[];
    senderEmailData: senderEmailDataModel;
    batchJobDetails: batchJobDetailsModel;
    workflowStatusNotes: string;
    modifiedBy: string;
    workflowStatusId: string;
    workflowId: string;
    buttonStatus: string;
}

export class deploymentModel {
    workflowStatusId: string;
    assignToId: string;
    assignById: string;
    workflowId: string;
}