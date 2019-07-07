import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDocComponent } from './transfer-doc.component';

describe('TransferDocComponent', () => {
  let component: TransferDocComponent;
  let fixture: ComponentFixture<TransferDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
