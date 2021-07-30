import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperAngularnodejsDetailComponent } from './wrapper-angularnodejs-detail.component';

describe('WrapperAngularnodejsDetailComponent', () => {
  let component: WrapperAngularnodejsDetailComponent;
  let fixture: ComponentFixture<WrapperAngularnodejsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperAngularnodejsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperAngularnodejsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
