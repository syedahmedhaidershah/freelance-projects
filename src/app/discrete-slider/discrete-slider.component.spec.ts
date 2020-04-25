import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteSliderComponent } from './discrete-slider.component';

describe('DiscreteSliderComponent', () => {
  let component: DiscreteSliderComponent;
  let fixture: ComponentFixture<DiscreteSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscreteSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscreteSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
