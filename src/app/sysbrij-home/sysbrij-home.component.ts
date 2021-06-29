import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { BaseComponent } from '../model/base.component';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-sysbrij-home',
  templateUrl: './sysbrij-home.component.html',
  styleUrls: ['./sysbrij-home.component.css']
})
export class SysbrijHomeComponent extends BaseComponent implements OnInit {
  myusername: string = '';
  authCode: string = '';
  private emailRegEx = '^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'
  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegEx)]),
    authorizationCode: new FormControl(null, [Validators.required]),
  });
  constructor(private router: Router, private LoginService: LoginService, private commonService: CommonService) {
    super();
    this.init();
  }
  private init() {
    if (this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
      this.commonService.redirectToPath('/sysbrijMaster/sysbrijDeploymentDashboard', true);
    }
  }
  get getUserFormRef() { return this.loginForm.controls }
  ngOnInit() {

  }
  onsubmit() {
    
    debugger
    if(this.myusername == "" || this.authCode == "") {
      alert("Please enter username and autherization code!");
    }
    else {
      this.LoginService.authenticate(this.myusername, this.authCode).subscribe((response) => {
        debugger;
        if(response.Result.LoginStatus == true) {
          this.commonService.setLocalStorageItem('isLoggedIn', '1');
          this.commonService.setLocalStorageItem('AccessCode', response.Result.AccessCode);
          this.commonService.setLocalStorageItem('CompanyId', response.Result.UserId);
          this.commonService.setLocalStorageItem('workflowId', response.Result.workflowId);
          this.commonService.setLocalStorageItem('workflowNo', response.Result.workflowNo);
          if(response.Result.AccessCode == "70") {
            this.router.navigate(["/sysbrijMaster/sysbrijStartNewDeployment"]);
          }
          else {
            this.router.navigate(["/sysbrijMaster/sysbrijDeploymentDashboard"]);
          }
        }
        else {
          alert("Invalid Credentials!");
        }
      }, 
      (error) => {
        debugger;
        console.log('Server Error - ', error);
      }); 
    }
  }

  clear() {
    this.myusername = "";
    this.authCode = "";
  }
}
