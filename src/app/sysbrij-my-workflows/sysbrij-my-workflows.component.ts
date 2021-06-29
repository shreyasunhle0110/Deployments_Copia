import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { WorkflowService } from '../services/workflow.service';
@Component({
  selector: 'app-sysbrij-my-workflows',
  templateUrl: './sysbrij-my-workflows.component.html',
  styleUrls: ['./sysbrij-my-workflows.component.css']
})
export class SysbrijMyWorkflowsComponent implements OnInit {

  myworkflowsList: any;
  private IS_LOGGED_IN = 'isLoggedIn';
  dtOptions: DataTables.Settings = {};
  constructor(private workflow: WorkflowService, private commonService: CommonService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      scrollX: true
    };
    this.init();
    this.getWorkflowList();
   }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
  }
  private getWorkflowList()
  {
    this.workflow.getworkflowsList().subscribe((response) => {
      debugger;
      this.myworkflowsList = response.Result;
      console.log(this.myworkflowsList);
    })
  }

  ngOnInit(): void {
  }

}
