import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperMyWorkflowsComponent } from './wrapper-my-workflows.component';

describe('WrapperMyWorkflowsComponent', () => {
  let component: WrapperMyWorkflowsComponent;
  let fixture: ComponentFixture<WrapperMyWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperMyWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperMyWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
