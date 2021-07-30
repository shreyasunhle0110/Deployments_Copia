import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperWordpressDetailComponent } from './wrapper-wordpress-detail.component';

describe('WrapperWordpressDetailComponent', () => {
  let component: WrapperWordpressDetailComponent;
  let fixture: ComponentFixture<WrapperWordpressDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperWordpressDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperWordpressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
