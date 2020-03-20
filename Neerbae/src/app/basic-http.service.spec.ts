import { TestBed } from '@angular/core/testing';

import { BasicHttpService } from './basic-http.service';

describe('BasicHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicHttpService = TestBed.get(BasicHttpService);
    expect(service).toBeTruthy();
  });
});
