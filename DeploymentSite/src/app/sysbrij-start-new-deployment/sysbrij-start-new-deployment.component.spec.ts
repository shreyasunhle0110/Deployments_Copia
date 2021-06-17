import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijStartNewDeploymentComponent } from './sysbrij-start-new-deployment.component';

describe('SysbrijStartNewDeploymentComponent', () => {
  let component: SysbrijStartNewDeploymentComponent;
  let fixture: ComponentFixture<SysbrijStartNewDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijStartNewDeploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijStartNewDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
