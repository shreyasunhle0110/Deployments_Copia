import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijHomeComponent } from './sysbrij-home.component';

describe('SysbrijHomeComponent', () => {
  let component: SysbrijHomeComponent;
  let fixture: ComponentFixture<SysbrijHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
