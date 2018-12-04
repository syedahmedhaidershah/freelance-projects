import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchItemComponent } from './scratch-item.component';

describe('ScratchItemComponent', () => {
  let component: ScratchItemComponent;
  let fixture: ComponentFixture<ScratchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
