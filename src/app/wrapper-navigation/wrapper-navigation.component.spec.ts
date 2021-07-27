import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperNavigationComponent } from './wrapper-navigation.component';

describe('WrapperNavigationComponent', () => {
  let component: WrapperNavigationComponent;
  let fixture: ComponentFixture<WrapperNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
