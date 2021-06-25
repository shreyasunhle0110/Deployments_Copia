import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-page-container',
  templateUrl: './sysbrij-page-container.component.html',
  styleUrls: ['./sysbrij-page-container.component.css']
})
export class SysbrijPageContainerComponent implements OnInit {

  private IS_LOGGED_IN = 'isLoggedIn';
  constructor(private commonService: CommonService) {
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
