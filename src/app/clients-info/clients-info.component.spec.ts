import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsInfoComponent } from './clients-info.component';

describe('ClientsInfoComponent', () => {
  let component: ClientsInfoComponent;
  let fixture: ComponentFixture<ClientsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
