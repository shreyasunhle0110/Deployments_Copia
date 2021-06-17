import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-sysbrij-home',
  templateUrl: './sysbrij-home.component.html',
  styleUrls: ['./sysbrij-home.component.css']
})
export class SysbrijHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Authorization() {
    this.router.navigate(["/sysbrijMaster"]);
  }

}
