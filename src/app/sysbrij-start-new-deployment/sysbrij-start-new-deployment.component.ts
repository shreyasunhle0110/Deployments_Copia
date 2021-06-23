import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowRegisterModel } from '../model/workflow.model';

@Component({
  selector: 'app-sysbrij-start-new-deployment',
  templateUrl: './sysbrij-start-new-deployment.component.html',
  styleUrls: ['./sysbrij-start-new-deployment.component.css']
})
export class SysbrijStartNewDeploymentComponent implements OnInit {
  workflowRegisterModel: WorkflowRegisterModel;
  constructor(private workflowService:WorkflowService) {
    this.workflowRegisterModel = new WorkflowRegisterModel();
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
