import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAllotteeComponent } from './new-allottee.component';

describe('NewAllotteeComponent', () => {
  let component: NewAllotteeComponent;
  let fixture: ComponentFixture<NewAllotteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAllotteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAllotteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
