import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCommentComponent } from './scratch-comment.component';

describe('ScratchCommentComponent', () => {
  let component: ScratchCommentComponent;
  let fixture: ComponentFixture<ScratchCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
