import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperKeyGenerationDetailComponent } from './wrapper-key-generation-detail.component';

describe('WrapperKeyGenerationDetailComponent', () => {
  let component: WrapperKeyGenerationDetailComponent;
  let fixture: ComponentFixture<WrapperKeyGenerationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperKeyGenerationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperKeyGenerationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
