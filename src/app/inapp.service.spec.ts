import { TestBed } from '@angular/core/testing';

import { InappService } from './inapp.service';

describe('InappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InappService = TestBed.get(InappService);
    expect(service).toBeTruthy();
  });
});
