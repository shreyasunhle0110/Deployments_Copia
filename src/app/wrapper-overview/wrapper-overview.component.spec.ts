import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperOverviewComponent } from './wrapper-overview.component';

describe('WrapperOverviewComponent', () => {
  let component: WrapperOverviewComponent;
  let fixture: ComponentFixture<WrapperOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
