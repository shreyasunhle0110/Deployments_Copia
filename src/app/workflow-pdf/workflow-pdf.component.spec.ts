import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowPdfComponent } from './workflow-pdf.component';

describe('WorkflowPdfComponent', () => {
  let component: WorkflowPdfComponent;
  let fixture: ComponentFixture<WorkflowPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
