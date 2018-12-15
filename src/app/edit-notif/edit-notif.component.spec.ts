import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotifComponent } from './edit-notif.component';

describe('EditNotifComponent', () => {
  let component: EditNotifComponent;
  let fixture: ComponentFixture<EditNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
