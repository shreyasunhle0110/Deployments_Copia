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

export class customerDataModel {
    customerName: string;
    profileIdWithBank: string;
    buildingNo: string;
    townName: string;
    postalCode: string;
    country: string;
}

export class customerContatModel {
    contactName: string;
    email: string;
    mobileNo: string;
    phoneNo: string;
}

export class customerEntitiesModel {
    name: string;
    accountNoWithBank: string;
    buildingNo: string;
    townName: string;
    postalCode: string;
    country: string;
}

export class customerERPDetailsModel {
    nameOrVersion: string;
    erpDetails: string;
}

export class customerRequirnmentsModel {
    inputFileMapping: number;
    inputfileTransformation: number;
    inputFileType: number;
    fileEncryption: number;
    h2hEncryption: number;
    paymentTypesForDForward: number;
}

export class installationMachineDetailsModel {
    whereSysbrijWillInstalled: number;
    noOfInstallation: string;
    serverType: string;
    ipAddress: string;
    serverOsVersion: string;
    isMachineConnectedToBankSystem: number;
    inputFileFolderPath: string;
    inputFileFolderName: string;
    isMachineInternateEnabled: number;
    anyFirewallRestriction: number;
    firewallRestrictionDetails: string;
    installSoftwareRemotely: number;
    remoteAccessMethod: string;
    moreDetails: string;
}

export class senderEmailDataModel {
    emailId: string;
    emailPassword: string;
    smtpHost: string;
    smtpPort: string;
    receiverEmail: string;
}

export class batchJobDetailsModel {
    frequency: string;
    setupBatchJobOnYourServer: number;
}

export class workflowFormModel {
    customerData: customerDataModel
    customerContat: customerContatModel
    customerEntities: customerEntitiesModel
    customerERPDetails: customerERPDetailsModel
    customerRequirnments: customerRequirnmentsModel
    installationMachineUATDetails: installationMachineDetailsModel
    installationMachineProductionDetails: installationMachineDetailsModel
    customerUserList: SysbrijUserModel[];
    senderEmailData: senderEmailDataModel
    batchJobDetails: batchJobDetailsModel
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