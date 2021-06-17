import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijMyWorkflowsComponent } from './sysbrij-my-workflows.component';

describe('SysbrijMyWorkflowsComponent', () => {
  let component: SysbrijMyWorkflowsComponent;
  let fixture: ComponentFixture<SysbrijMyWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijMyWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijMyWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
