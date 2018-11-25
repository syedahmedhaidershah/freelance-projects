import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchTemplateComponent } from './scratch-template.component';

describe('ScratchTemplateComponent', () => {
  let component: ScratchTemplateComponent;
  let fixture: ComponentFixture<ScratchTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
