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

  constructor(private router: Router, private LoginService: LoginService, private commonService: CommonService) {
    super();
    this.init();
  }
  private init() {
    // if (this.commonService.isUserLoggedIn(this.IS_LOGGED_IN)) {
    //   this.commonService.redirectToPath('/sysbrijDeploymentDashboard', true);
    // }
  }
  //get getUserFormRef() { return this.loginForm.controls }
  ngOnInit() {

  }
  auth() {
    
    debugger
    this.LoginService.authenticate(this.myusername, this.authCode).subscribe((response) => {
      debugger;
      if(response.Result.LoginStatus == true) {
        this.commonService.setLocalStorageItem('isLoggedIn', '1');
        this.commonService.setLocalStorageItem('AccessCode', response.Result.AccessCode);
        this.router.navigate(["/sysbrijMaster/sysbrijDeploymentDashboard"]);
      }
      else {
        alert("Invalid Credentials!");
      }
    }, 
    (error) => {
      debugger;
      console.log('Invalid credentials', error);
    });
  }
}
