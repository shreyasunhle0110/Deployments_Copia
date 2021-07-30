import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperJavaDetailComponent } from './wrapper-java-detail.component';

describe('WrapperJavaDetailComponent', () => {
  let component: WrapperJavaDetailComponent;
  let fixture: ComponentFixture<WrapperJavaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperJavaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperJavaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
