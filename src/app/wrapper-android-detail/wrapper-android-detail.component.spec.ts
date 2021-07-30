import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperAndroidDetailComponent } from './wrapper-android-detail.component';

describe('WrapperAndroidDetailComponent', () => {
  let component: WrapperAndroidDetailComponent;
  let fixture: ComponentFixture<WrapperAndroidDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperAndroidDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperAndroidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
