import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperIntegrationDetailComponent } from './wrapper-integration-detail.component';

describe('WrapperIntegrationDetailComponent', () => {
  let component: WrapperIntegrationDetailComponent;
  let fixture: ComponentFixture<WrapperIntegrationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperIntegrationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperIntegrationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
