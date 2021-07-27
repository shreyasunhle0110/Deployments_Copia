import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperPhpDetailComponent } from './wrapper-php-detail.component';

describe('WrapperPhpDetailComponent', () => {
  let component: WrapperPhpDetailComponent;
  let fixture: ComponentFixture<WrapperPhpDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperPhpDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperPhpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
