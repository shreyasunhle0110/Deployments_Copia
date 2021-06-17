import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijDeploymentDashboardComponent } from './sysbrij-deployment-dashboard.component';

describe('SysbrijDeploymentDashboardComponent', () => {
  let component: SysbrijDeploymentDashboardComponent;
  let fixture: ComponentFixture<SysbrijDeploymentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijDeploymentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijDeploymentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
