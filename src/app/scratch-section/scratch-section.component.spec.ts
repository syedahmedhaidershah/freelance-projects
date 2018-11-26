import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchSectionComponent } from './scratch-section.component';

describe('ScratchSectionComponent', () => {
  let component: ScratchSectionComponent;
  let fixture: ComponentFixture<ScratchSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
