import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-wrapper-integration-detail',
  templateUrl: './wrapper-integration-detail.component.html',
  styleUrls: ['./wrapper-integration-detail.component.css']
})
export class WrapperIntegrationDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
