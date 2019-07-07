import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedAllotmentsComponent } from './issued-allotments.component';

describe('IssuedAllotmentsComponent', () => {
  let component: IssuedAllotmentsComponent;
  let fixture: ComponentFixture<IssuedAllotmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedAllotmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedAllotmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
