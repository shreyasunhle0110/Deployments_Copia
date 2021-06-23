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

  myusername : string  = '';
  authCode: string = '';
  PageStatus: string = "loginPage"
  SharedVariable: string = "shared";
  private emailRegEx = '^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$'
  $IsInvalidCredentials = new BehaviorSubject(false);
  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegEx)]),
    userPassword: new FormControl(null, [Validators.required]),
  });
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
    debugger;
    this.$IsInvalidCredentials.next(false);
    this.myusername = (<HTMLInputElement>document.getElementById("email")).value;
    this.authCode = (<HTMLInputElement>document.getElementById("userPassword")).value;
    console.log(this.myusername)
    debugger
    this.LoginService.authenticate(this.myusername,this.authCode).subscribe((response) => {
      debugger;
      console.log("Login Successfull")

       this.commonService.setLocalStorageItem('isLoggedIn', '1');
       this.commonService.setLocalStorageItem('AccessCode', response.resultData.AccessCode);
      this.router.navigate(["/sysbrijMaster/sysbrijDeploymentDashboard"]);
      //window.location.href = '/sysbrijDeploymentDashboard'
    }, (error) => {
      debugger;
      console.log('Invalid credentials', error);
      if (error.status === 401) {
        this.$IsInvalidCredentials.next(true);
      }
   
    });
  }
 }
