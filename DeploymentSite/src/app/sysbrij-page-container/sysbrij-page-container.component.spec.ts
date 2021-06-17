import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijPageContainerComponent } from './sysbrij-page-container.component';

describe('SysbrijPageContainerComponent', () => {
  let component: SysbrijPageContainerComponent;
  let fixture: ComponentFixture<SysbrijPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijPageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
