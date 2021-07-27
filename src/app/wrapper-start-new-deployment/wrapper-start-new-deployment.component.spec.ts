import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperStartNewDeploymentComponent } from './wrapper-start-new-deployment.component';

describe('WrapperStartNewDeploymentComponent', () => {
  let component: WrapperStartNewDeploymentComponent;
  let fixture: ComponentFixture<WrapperStartNewDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperStartNewDeploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperStartNewDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
