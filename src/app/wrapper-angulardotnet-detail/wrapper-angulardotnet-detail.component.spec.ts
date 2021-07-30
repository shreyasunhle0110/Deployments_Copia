import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperAngulardotnetDetailComponent } from './wrapper-angulardotnet-detail.component';

describe('WrapperAngulardotnetDetailComponent', () => {
  let component: WrapperAngulardotnetDetailComponent;
  let fixture: ComponentFixture<WrapperAngulardotnetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperAngulardotnetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperAngulardotnetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
