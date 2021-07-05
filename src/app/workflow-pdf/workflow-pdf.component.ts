import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'app-workflow-pdf',
  templateUrl: './workflow-pdf.component.html',
  styleUrls: ['./workflow-pdf.component.css']
})
export class WorkflowPdfComponent implements OnInit {
  workflowId: string;
  workflowDetailObject: any;
  constructor(private workflowService: WorkflowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workflowId = this.route.snapshot.params["id"];
    this.workflowDetails(this.workflowId);
    setTimeout(function() {
      window.print();
    }, 1000)
    
  }

  workflowDetails(workflowId) {
    this.workflowService.workflowDetails(workflowId).subscribe(
      (response: any) => {
        debugger;
        this.workflowDetailObject = response.Result;
        console.log(this.workflowDetailObject);
      }
    )
  }

}
