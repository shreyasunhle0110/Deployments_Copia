import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowRegisterModel } from '../model/workflow.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-start-new-deployment',
  templateUrl: './sysbrij-start-new-deployment.component.html',
  styleUrls: ['./sysbrij-start-new-deployment.component.css']
})
export class SysbrijStartNewDeploymentComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  workflowRegisterModel: WorkflowRegisterModel;
  constructor(private workflowService: WorkflowService, private commonService: CommonService) {
    this.init()
    this.workflowRegisterModel = new WorkflowRegisterModel();
   }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
  }

  ngOnInit(): void {
   
  }

  workflowRegister() {
    debugger;
    this.workflowRegisterModel.status= "1";
    this.workflowRegisterModel.createdBy= "1";
    this.workflowService.workflowRegister(this.workflowRegisterModel).subscribe(
      (response: any) => {
        debugger;
        console.log("response received");
        console.log(response);
      })
  }

}
