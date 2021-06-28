import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sysbrij-navigation',
  templateUrl: './sysbrij-navigation.component.html',
  styleUrls: ['./sysbrij-navigation.component.css']
})
export class SysbrijNavigationComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  onLogout() {
    this.commonService.loggedOut();
  }

  ngOnInit(): void {
  }

}
