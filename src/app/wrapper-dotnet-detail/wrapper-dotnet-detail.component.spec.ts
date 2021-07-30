import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperDotnetDetailComponent } from './wrapper-dotnet-detail.component';

describe('WrapperDotnetDetailComponent', () => {
  let component: WrapperDotnetDetailComponent;
  let fixture: ComponentFixture<WrapperDotnetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperDotnetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperDotnetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
