import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijNavigationComponent } from './sysbrij-navigation.component';

describe('SysbrijNavigationComponent', () => {
  let component: SysbrijNavigationComponent;
  let fixture: ComponentFixture<SysbrijNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
