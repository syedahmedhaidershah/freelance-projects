import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloteesListComponent } from './allotees-list.component';

describe('AlloteesListComponent', () => {
  let component: AlloteesListComponent;
  let fixture: ComponentFixture<AlloteesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlloteesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlloteesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
