import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'app-sysbrij-deployment-dashboard',
  templateUrl: './sysbrij-deployment-dashboard.component.html',
  styleUrls: ['./sysbrij-deployment-dashboard.component.css']
})
export class SysbrijDeploymentDashboardComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  myworkflowsList: any;
  constructor(private workflow: WorkflowService, private commonService: CommonService) {
    this.init();
  }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
    this.getWorkflowList();
  }
  private getWorkflowList() {
    this.workflow.getworkflowsList().subscribe((response) => {

      debugger;
      this.myworkflowsList = response.Result;
      console.log(this.myworkflowsList);
    })
  }

  ngOnInit(): void {
  }

}
