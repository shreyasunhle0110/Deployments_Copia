import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-navigation',
  templateUrl: './sysbrij-navigation.component.html',
  styleUrls: ['./sysbrij-navigation.component.css']
})
export class SysbrijNavigationComponent implements OnInit {
  accessCode: string;
  userName: string;
  userCompany: string;
  constructor(private commonService: CommonService) { }

  onLogout() {
    this.commonService.loggedOut();
  }

  ngOnInit(): void {
    this.accessCode = this.commonService.getLocalStorageItem("AccessCode");
    this.userName = this.commonService.getLocalStorageItem("userName");
    this.userCompany = this.commonService.getLocalStorageItem("userCompany");
  }

}
