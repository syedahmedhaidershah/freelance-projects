import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchFileComponent } from './switch-file.component';

describe('SwitchFileComponent', () => {
  let component: SwitchFileComponent;
  let fixture: ComponentFixture<SwitchFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
