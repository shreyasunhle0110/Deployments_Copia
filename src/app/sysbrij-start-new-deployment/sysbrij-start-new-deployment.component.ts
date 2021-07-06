import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowRegisterModel, SysbrijUserModel, customerDataModel, customerContatModel, customerEntitiesModel, customerERPDetailsModel, customerRequirnmentsModel, installationMachineDetailsModel, senderEmailDataModel, batchJobDetailsModel, workflowFormModel, deploymentModel } from '../model/workflow.model';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { CommonService } from '../services/common.service';
import { dropdownService } from '../services/dropdown.service';

@Component({
  selector: 'app-sysbrij-start-new-deployment',
  templateUrl: './sysbrij-start-new-deployment.component.html',
  styleUrls: ['./sysbrij-start-new-deployment.component.css']
})
export class SysbrijStartNewDeploymentComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  pageStatus: string = "";
  workflowRegisterModel: WorkflowRegisterModel;
  sysbrijUserListModel: SysbrijUserModel[] = new Array<SysbrijUserModel>();
  customerDataModel: customerDataModel;
  customerContatModel: customerContatModel;
  customerEntitiesListModel: customerEntitiesModel[] = new Array<customerEntitiesModel>();
  customerERPDetailsModel: customerERPDetailsModel;
  customerRequirnmentsModel: customerRequirnmentsModel;
  installationMachineDetailsUATModel: installationMachineDetailsModel;
  installationMachineDetailsProductionModel: installationMachineDetailsModel;
  senderEmailDataModel: senderEmailDataModel;
  batchJobDetailsModel: batchJobDetailsModel;
  workflowFormModel: workflowFormModel;
  deploymentModel: deploymentModel;
  loaderActive: boolean = false;
  loaderActiveSaveOnly: boolean = false;
  loaderActiveSaveDeploy: boolean = false;
  loaderActiveSave: boolean = false;
  workflowId: string = "";
  userId: string = "";
  inputFileTypeDD: any;
  encryptionDD: any;
  paymentTypeDD: any;
  workflowStatusDD: any;
  companyUserAutocompleteDD: any;
  assignToId: string;
  assignToName: string;
  assignToEmail: string;
  accessCode: string;
  saveDeployCheck: string;
  keyword = 'name';
  initialValue: any;
  workflowHistory = [];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(
    private workflowService: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private dropdownService: dropdownService
  ) {
    this.workflowRegisterModel = new WorkflowRegisterModel();
    this.customerDataModel = new customerDataModel();
    this.customerContatModel = new customerContatModel();
    this.customerERPDetailsModel = new customerERPDetailsModel();
    this.customerRequirnmentsModel = new customerRequirnmentsModel();
    this.installationMachineDetailsUATModel = new installationMachineDetailsModel();
    this.installationMachineDetailsProductionModel = new installationMachineDetailsModel();
    this.senderEmailDataModel = new senderEmailDataModel();
    this.batchJobDetailsModel = new batchJobDetailsModel();
    this.workflowFormModel = new workflowFormModel();
    this.deploymentModel = new deploymentModel();
    this.route.params.subscribe(params => {
      this.workflowId = params.id;
      this.pageStatus = params.pageStatus;
    })
    this.init()
  }

  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
    this.workflowRegisterModel.AuthorizationCode = (Math.floor(Math.random() * 10000000)).toString();
  }
  ngOnInit(): void {
    var registerDate = new Date();
    this.workflowRegisterModel.date = registerDate.getDate() + " " + this.monthNames[registerDate.getMonth()] + " " + registerDate.getFullYear();
    this.accessCode = this.commonService.getLocalStorageItem("AccessCode");
    this.userId = this.commonService.getLocalStorageItem("CompanyId");
    this.inputFileTypeDropdown();
    this.encryptionDropdown();
    this.paymentTypeMasterDropdown();
    this.workflowStausMasterDropdown();
    this.companyUserAutocomplete();
    if (this.workflowId != "") {
      this.workflowDetails(this.workflowId);
    }
  }

  workflowRegister() {
    debugger;
    this.loaderActive = true;
    if (
      this.workflowRegisterModel.hsbcPersonName != undefined
      && this.workflowRegisterModel.hsbcIntegrationManagerName != undefined
      && this.workflowRegisterModel.hsbcIntegrationManagerEmail != undefined
      && this.workflowRegisterModel.hsbcmobileNo != undefined
      && this.workflowRegisterModel.companyName != undefined
      && this.workflowRegisterModel.companyContactName != undefined
      && this.workflowRegisterModel.companyEmail != undefined
      && this.workflowRegisterModel.companyContactNo != undefined
      && this.workflowRegisterModel.assignWorkflowToCompanyContact != 0
      && this.workflowRegisterModel.assignWorkflowToCompanyContact != undefined) {
      this.workflowRegisterModel.status = "1";
      this.workflowRegisterModel.createdBy = this.userId;
      this.workflowRegisterModel.workflowId = this.workflowId;
      this.workflowService.workflowRegister(this.workflowRegisterModel).subscribe(
        (response: any) => {
          debugger;
          if (response.Result == true) {
            this.loaderActive = false;
            alert("Company Register Successfull!");
            this.router.navigate(["/sysbrijMaster/sysbrijMyWorkflows"]);
          }
          else {
            this.loaderActive = false;
            alert("Error!");
          }
        })
    }
    else {
      alert("Please fill all the fields");
      this.loaderActive = false;
    }
  }

  addSysbrijUser(userName, userEmail, userAddress, userMobile, userRole) {
    debugger;
    console.log(this.sysbrijUserListModel);
    if (this.sysbrijUserListModel == null) {
      this.sysbrijUserListModel = new Array<SysbrijUserModel>();
    }
    this.sysbrijUserListModel.push(
      new SysbrijUserModel(
        userName.value,
        userEmail.value,
        userAddress.value,
        userMobile.value,
        userRole.value)
    )

    userName.value = "";
    userEmail.value = "";
    userAddress.value = "";
    userMobile.value = "";
    userRole.value = "";
  }

  addCustomerEntities(entityName, entityAccountNo, entityBuildingNo, entityTownName, entityPostalCode, entityCountry) {
    debugger;
    if (this.customerEntitiesListModel == null) {
      this.customerEntitiesListModel = new Array<customerEntitiesModel>();
    }
    this.customerEntitiesListModel.push(
      new customerEntitiesModel(
        entityName.value,
        entityAccountNo.value,
        entityBuildingNo.value,
        entityTownName.value,
        entityPostalCode.value,
        entityCountry.value
      )
    )

    entityName.value = ""
    entityAccountNo.value = ""
    entityBuildingNo.value = ""
    entityTownName.value = ""
    entityPostalCode.value = ""
    entityCountry.value = ""
  }

  removeUser(index) {
    this.sysbrijUserListModel.splice(index, 1);
  }

  removeEntity(index) {
    this.customerEntitiesListModel.splice(index, 1);
  }

  workflowDetails(workflowId) {
    this.workflowService.workflowDetails(workflowId).subscribe(
      (response: any) => {
        debugger;
        this.deploymentModel.assignToId = response.Result.deploymentDetails.assignToId;
        this.deploymentModel.workflowStatusId = response.Result.deploymentDetails.workflowStatusId;
        if(this.companyUserAutocompleteDD != undefined) {
          for(var i = 0; i<this.companyUserAutocompleteDD.length; i++) {
            if(this.companyUserAutocompleteDD[i].id == this.deploymentModel.assignToId) {
              this.initialValue = this.companyUserAutocompleteDD[i];
              break;
            }
          }
        }
        this.saveDeployCheck = response.Result.saveDeployCheck;
        this.workflowRegisterModel = response.Result.workflowForm1;
        this.customerDataModel = response.Result.workflowForm2.customerData;
        this.customerContatModel = response.Result.workflowForm2.customerContat;
        this.customerEntitiesListModel = response.Result.workflowForm2.customerEntitiesList;
        this.customerERPDetailsModel = response.Result.workflowForm2.customerERPDetails;
        this.customerRequirnmentsModel = response.Result.workflowForm2.customerRequirnments;
        this.installationMachineDetailsUATModel = response.Result.workflowForm2.installationMachineUATDetails;
        this.installationMachineDetailsProductionModel = response.Result.workflowForm2.installationMachineProductionDetails;
        this.senderEmailDataModel = response.Result.workflowForm2.senderEmailData;
        this.batchJobDetailsModel = response.Result.workflowForm2.batchJobDetails;
        this.workflowFormModel.workflowStatusNotes = response.Result.workflowForm2.workflowStatusNotes;
        this.workflowFormModel.attachmentFileName = response.Result.workflowForm2.attachmentFileName;
        this.sysbrijUserListModel = response.Result.workflowForm2.customerUserList;
        this.workflowHistory = response.Result.workflowHistory;
      }
    )
  }

  workflowSaveOnly() {
    debugger;
    this.loaderActiveSaveOnly = true;
    this.workflowFormModel.modifiedBy = this.userId;
    this.workflowFormModel.workflowId = this.workflowId;
    if (this.saveDeployCheck != "1") {
      this.workflowFormModel.workflowStatusId = "1";
    } else {
      this.workflowFormModel.workflowStatusId = "2";
    }

    this.workflowFormModel.customerData = this.customerDataModel;
    this.workflowFormModel.customerContat = this.customerContatModel;
    this.workflowFormModel.customerEntitiesList = this.customerEntitiesListModel;
    this.workflowFormModel.customerERPDetails = this.customerERPDetailsModel;
    this.workflowFormModel.customerRequirnments = this.customerRequirnmentsModel;
    this.workflowFormModel.installationMachineUATDetails = this.installationMachineDetailsUATModel;
    this.workflowFormModel.installationMachineProductionDetails = this.installationMachineDetailsProductionModel;
    this.workflowFormModel.customerUserList = this.sysbrijUserListModel;
    this.workflowFormModel.senderEmailData = this.senderEmailDataModel;
    this.workflowFormModel.batchJobDetails = this.batchJobDetailsModel;
    this.workflowFormModel.buttonStatus = "save only";

    this.workflowService.updateWorkflowDetails(this.workflowFormModel).subscribe(
      (response: any) => {
        if (response.Result == true) {
          this.loaderActiveSaveOnly = false;
          alert("Workflow data updated successfully");
          this.router.navigate(["/sysbrijMaster/sysbrijMyWorkflows"]);
        }
        else {
          this.loaderActiveSaveOnly = false;
          alert("Something went wrong");
        }
      }
    )
  }

  workflowSaveDeploy() {
    debugger;
    this.loaderActiveSaveDeploy = true;
    this.workflowFormModel.modifiedBy = this.userId;
    this.workflowFormModel.workflowId = this.workflowId;
    this.workflowFormModel.workflowStatusId = "2";
    this.workflowFormModel.customerData = this.customerDataModel;
    this.workflowFormModel.customerContat = this.customerContatModel;
    this.workflowFormModel.customerEntitiesList = this.customerEntitiesListModel;
    this.workflowFormModel.customerERPDetails = this.customerERPDetailsModel;
    this.workflowFormModel.customerRequirnments = this.customerRequirnmentsModel;
    this.workflowFormModel.installationMachineUATDetails = this.installationMachineDetailsUATModel;
    this.workflowFormModel.installationMachineProductionDetails = this.installationMachineDetailsProductionModel;
    this.workflowFormModel.customerUserList = this.sysbrijUserListModel;
    this.workflowFormModel.senderEmailData = this.senderEmailDataModel;
    this.workflowFormModel.batchJobDetails = this.batchJobDetailsModel;
    this.workflowFormModel.buttonStatus = "save deploy";

    console.log(this.workflowFormModel);

    this.workflowService.updateWorkflowDetails(this.workflowFormModel).subscribe(
      (response: any) => {
        if (response.Result == true) {
          this.loaderActiveSaveDeploy = false;
          alert("Workflow data save successfully");
          this.router.navigate(["/sysbrijMaster/sysbrijMyWorkflows"]);
        }
        else {
          this.loaderActiveSaveDeploy = false;
          alert("Something went wrong");
        }
      }
    )
  }

  inputFileTypeDropdown() {
    this.dropdownService.inputFileTypeDropdown().subscribe((response: any) => {
      this.inputFileTypeDD = response.Result;
    })
  }

  encryptionDropdown() {
    this.dropdownService.encryptionDropdown().subscribe((response: any) => {
      this.encryptionDD = response.Result;
    })
  }

  paymentTypeMasterDropdown() {
    this.dropdownService.paymentTypeMasterDropdown().subscribe((response: any) => {
      this.paymentTypeDD = response.Result;
      console.log(this.paymentTypeDD);
    })
  }

  workflowStausMasterDropdown() {
    this.dropdownService.workflowStatusMasterDropdown().subscribe((response: any) => {
      this.workflowStatusDD = response.Result;
    })
  }

  companyUserAutocomplete() {
    this.dropdownService.companyUserAutocomplete().subscribe((response: any) => {
      this.companyUserAutocompleteDD = response.Result;
      console.log(this.companyUserAutocompleteDD);
    })
  }

  selectEvent(item) {
    debugger;
    this.assignToId = item.id;
    this.assignToEmail = item.email;
    this.assignToName = item.name;
  }

  deploymentWorkflow() {
    this.loaderActiveSave = true;
    this.deploymentModel.assignToId = this.assignToId;
    this.deploymentModel.assignById = this.userId;
    this.deploymentModel.workflowId = this.workflowId;

    this.workflowService.deploymentWorkflow(this.deploymentModel).subscribe((response: any) => {
      if (response.Result == true) {
        alert("Workflow assigned successful!");
        this.loaderActiveSave = false;
        this.router.navigate(["/sysbrijMaster/sysbrijMyWorkflows"]);
      }
      else {
        alert("Error!");
        this.loaderActiveSave = false;
      }
    })
  }

  saveDeployButtonCheck() {
    var disabledCheck = true;
    var customerDataCheck = true;
    var customerContactCheck = true;
    var customerEntitiesListCheck = true;
    var csutomerERPDetailCheck = true;
    var customerRequirnmentCheck = true;
    var uatMachineCheck = true;
    var productionMachineCheck = true;
    var customerUserListCheck = true;
    var senderEmailCheck = true;
    var batchJobDetailCheck = true;
    var workflowStatusCheck = true;
    // Customer Data Check
    for (var key in this.customerDataModel) {
      var value = this.customerDataModel[key];
      if (value == "" || value == undefined) {
        customerDataCheck = true
        break
      }
      else {
        customerDataCheck = false
      }
    }

    // Customer Contact Check
    for (var key in this.customerContatModel) {
      var value = this.customerContatModel[key];
      if (value == "" || value == undefined) {
        customerContactCheck = true
        break
      }
      else {
        customerContactCheck = false
      }
    }

    // Customer Entities List Check
    if (this.customerEntitiesListModel.length == 0) {
      customerEntitiesListCheck = true;
    }
    else {
      customerEntitiesListCheck = false
    }

    // Customer ERP Detail Check
    for (var key in this.customerERPDetailsModel) {
      var value = this.customerERPDetailsModel[key];
      if (value == "" || value == undefined) {
        csutomerERPDetailCheck = true
        break
      }
      else {
        csutomerERPDetailCheck = false
      }
    }

    // Customer Requirnment Check
    for (var key in this.customerRequirnmentsModel) {
      var value = this.customerRequirnmentsModel[key];
      if (value == "" || value == undefined) {
        customerRequirnmentCheck = true
        break
      }
      else {
        customerRequirnmentCheck = false
      }
    };

    // UAT Machine Check
    for (var key in this.installationMachineDetailsUATModel) {
      var value = this.installationMachineDetailsUATModel[key];
      if (value == "" || value == undefined) {
        uatMachineCheck = true
        break
      }
      else {
        uatMachineCheck = false
      }
    }

    // Production Machine Check
    for (var key in this.installationMachineDetailsProductionModel) {
      var value = this.installationMachineDetailsProductionModel[key];
      if (value == "" || value == undefined) {
        productionMachineCheck = true
        break
      }
      else {
        productionMachineCheck = false
      }
    }

    // Customer User List Check
    if (this.sysbrijUserListModel.length == 0) {
      customerUserListCheck = true;
    }
    else {
      customerUserListCheck = false
    }

    // Sender Email Check
    for (var key in this.senderEmailDataModel) {
      var value = this.senderEmailDataModel[key];
      if (value == "" || value == undefined) {
        senderEmailCheck = true
        break
      }
      else {
        senderEmailCheck = false
      }
    }

    // Batch Job Detail Check
    for (var key in this.batchJobDetailsModel) {
      var value = this.batchJobDetailsModel[key];
      if (value == "" || value == undefined) {
        batchJobDetailCheck = true
        break
      }
      else {
        batchJobDetailCheck = false
      }
    }

    if (this.workflowFormModel.workflowStatusNotes == "" || this.workflowFormModel.workflowStatusNotes == undefined) {
      workflowStatusCheck = true;
    } else {
      workflowStatusCheck = false;
    }

    if ((customerDataCheck == true ||
      customerContactCheck == true ||
      customerEntitiesListCheck == true ||
      csutomerERPDetailCheck == true ||
      customerRequirnmentCheck == true ||
      uatMachineCheck == true ||
      productionMachineCheck == true ||
      customerUserListCheck == true ||
      senderEmailCheck == true ||
      batchJobDetailCheck == true ||
      workflowStatusCheck == true) ||
      (this.saveDeployCheck == "1" && this.accessCode != '99')
    ) {
      disabledCheck = true;
    }
    else {
      disabledCheck = false;
    }

    return disabledCheck;
  }

  handleUpload(event) {
    debugger;
    const file = event.target.files[0];
    this.workflowFormModel.attachmentFileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.workflowFormModel.attachment = reader.result.toString().split(",").pop();
    };
}
}
