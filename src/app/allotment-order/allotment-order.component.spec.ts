import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentOrderComponent } from './allotment-order.component';

describe('AllotmentOrderComponent', () => {
  let component: AllotmentOrderComponent;
  let fixture: ComponentFixture<AllotmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
