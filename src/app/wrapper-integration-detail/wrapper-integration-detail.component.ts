import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-wrapper-integration-detail',
  templateUrl: './wrapper-integration-detail.component.html',
  styleUrls: ['./wrapper-integration-detail.component.css']
})
export class WrapperIntegrationDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  scrollTop() {
    this.router.navigate(['wrapperangularNodejsDetail'], { relativeTo: this.route, fragment: 'IntegrationDetails' })
  }
}
