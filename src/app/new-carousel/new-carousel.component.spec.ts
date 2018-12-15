import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCarouselComponent } from './new-carousel.component';

describe('NewCarouselComponent', () => {
  let component: NewCarouselComponent;
  let fixture: ComponentFixture<NewCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
