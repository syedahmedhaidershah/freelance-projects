import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotifComponent } from './create-notif.component';

describe('CreateNotifComponent', () => {
  let component: CreateNotifComponent;
  let fixture: ComponentFixture<CreateNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
