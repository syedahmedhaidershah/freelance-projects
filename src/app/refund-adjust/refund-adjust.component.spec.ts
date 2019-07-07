import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundAdjustComponent } from './refund-adjust.component';

describe('RefundAdjustComponent', () => {
  let component: RefundAdjustComponent;
  let fixture: ComponentFixture<RefundAdjustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundAdjustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
