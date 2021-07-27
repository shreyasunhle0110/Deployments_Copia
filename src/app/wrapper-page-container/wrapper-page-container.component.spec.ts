import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperPageContainerComponent } from './wrapper-page-container.component';

describe('WrapperPageContainerComponent', () => {
  let component: WrapperPageContainerComponent;
  let fixture: ComponentFixture<WrapperPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperPageContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
