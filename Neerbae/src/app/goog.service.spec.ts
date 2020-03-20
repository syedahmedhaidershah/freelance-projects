import { TestBed } from '@angular/core/testing';

import { GoogService } from './goog.service';

describe('GoogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogService = TestBed.get(GoogService);
    expect(service).toBeTruthy();
  });
});
