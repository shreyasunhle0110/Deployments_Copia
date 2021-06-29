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
  loaderActiveSaveDeploy: boolean = false
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
  keyword = 'name';
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
    })
    this.init()
  }

  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
  }
  ngOnInit(): void {
    var registerDate = new Date();
    this.workflowRegisterModel.date = registerDate.getDate() + " " + this.monthNames[registerDate.getMonth()] + " " + registerDate.getFullYear();
    // this.workflowId = this.commonService.getLocalStorageItem("workflowId");
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
    this.loaderActive = true;
    this.workflowRegisterModel.status = "1";
    this.workflowRegisterModel.createdBy = "1";
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

  addSysbrijUser(userName, userEmail, userAddress, userMobile, userRole) {
    debugger;
    console.log(this.sysbrijUserListModel);
    if(this.sysbrijUserListModel == null){
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
    if(this.customerEntitiesListModel == null){
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
        console.log("The result is - ");
        console.log(response);
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
        this.sysbrijUserListModel = response.Result.workflowForm2.customerUserList;
      }
    )
  }

  workflowSaveOnly() {
    debugger;
    this.loaderActiveSaveOnly = true;
    this.workflowFormModel.modifiedBy = this.userId;
    this.workflowFormModel.workflowId = this.workflowId;
    this.workflowFormModel.workflowStatusId = "1";
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

    console.log(this.workflowFormModel);

    this.workflowService.updateWorkflowDetails(this.workflowFormModel).subscribe(
      (response: any) => {
        if(response.Result == true) {
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
        if(response.Result == true) {
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
    this.deploymentModel.assignToId = this.assignToId;
    this.deploymentModel.assignById = this.userId;
    this.deploymentModel.workflowId = this.workflowId;

    this.workflowService.deploymentWorkflow(this.deploymentModel).subscribe((response: any) => {
      if(response.Result == true) {
        alert("Workflow assigned successful!");
      }
      else {
        alert("Error!");
      }
    })
  }
}
