import { TestBed } from '@angular/core/testing';

import { InspectionsService } from './inspections.service';

describe('InspectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InspectionsService = TestBed.get(InspectionsService);
    expect(service).toBeTruthy();
  });
});
