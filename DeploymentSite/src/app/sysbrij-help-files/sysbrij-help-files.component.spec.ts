import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysbrijHelpFilesComponent } from './sysbrij-help-files.component';

describe('SysbrijHelpFilesComponent', () => {
  let component: SysbrijHelpFilesComponent;
  let fixture: ComponentFixture<SysbrijHelpFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysbrijHelpFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysbrijHelpFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
