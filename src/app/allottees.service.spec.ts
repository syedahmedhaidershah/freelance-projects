import { TestBed } from '@angular/core/testing';

import { AllotteesService } from './allottees.service';

describe('AllotteesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllotteesService = TestBed.get(AllotteesService);
    expect(service).toBeTruthy();
  });
});
