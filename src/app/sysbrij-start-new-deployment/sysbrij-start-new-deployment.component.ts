import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowRegisterModel, SysbrijUserModel } from '../model/workflow.model';
import { Router } from '../../../node_modules/@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-start-new-deployment',
  templateUrl: './sysbrij-start-new-deployment.component.html',
  styleUrls: ['./sysbrij-start-new-deployment.component.css']
})
export class SysbrijStartNewDeploymentComponent implements OnInit {
  workflowRegisterModel: WorkflowRegisterModel;
  sysbrijUserListModel: SysbrijUserModel[] = [];
  loaderActive:boolean = false;
  companyId: string = "";
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(
    private workflowService:WorkflowService, 
    private router: Router,
    private commonService: CommonService
  ) {
    this.workflowRegisterModel = new WorkflowRegisterModel();
   }

  ngOnInit(): void {
    var registerDate = new Date();
    this.workflowRegisterModel.date = registerDate.getDate() + " " + this.monthNames[registerDate.getMonth()] + " " + registerDate.getFullYear();
    this.companyId = this.commonService.getLocalStorageItem("CompanyId");

    if(this.companyId != "") {
      this.workflowDetails(this.companyId);
    }
  }

  workflowRegister() {
    this.loaderActive = true;
    this.workflowRegisterModel.status= "1";
    this.workflowRegisterModel.createdBy= "1";
    this.workflowService.workflowRegister(this.workflowRegisterModel).subscribe(
      (response: any) => {
        debugger;
        if(response.Result == true) {
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
    this.sysbrijUserListModel.push(
      new SysbrijUserModel(userName.value, userEmail.value, userAddress.value, userMobile.value, userRole.value)
    )

    userName.value = "";
    userEmail.value = "";
    userAddress.value = "";
    userMobile.value = "";
    userRole.value = "";
  }

  removeUser(index) {
    this.sysbrijUserListModel.splice(index, 1);
  }

  workflowDetails(companyId) {
    this.workflowService.workflowDetails(companyId).subscribe(
      (response: any) => {
        console.log("The result is - ");
        console.log(response);
        this.workflowRegisterModel = response.Result;
      }
    )
  }
}
