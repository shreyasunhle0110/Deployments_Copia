import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-deployment-dashboard',
  templateUrl: './sysbrij-deployment-dashboard.component.html',
  styleUrls: ['./sysbrij-deployment-dashboard.component.css']
})
export class SysbrijDeploymentDashboardComponent implements OnInit {
  private IS_LOGGED_IN = 'isLoggedIn';
  constructor( private commonService: CommonService) {
    this.init();
  }
  private init() {
    if (!this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijHome', true);
    }
  }

  ngOnInit(): void {
  }

}
