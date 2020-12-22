import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationsDialogComponent } from './iterations-dialog.component';

describe('IterationsDialogComponent', () => {
  let component: IterationsDialogComponent;
  let fixture: ComponentFixture<IterationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IterationsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
