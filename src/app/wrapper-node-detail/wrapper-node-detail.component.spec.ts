import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperNodeDetailComponent } from './wrapper-node-detail.component';

describe('WrapperNodeDetailComponent', () => {
  let component: WrapperNodeDetailComponent;
  let fixture: ComponentFixture<WrapperNodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperNodeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperNodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
