import { TestBed } from '@angular/core/testing';

import { RoutingInterceptService } from './routing-intercept.service';

describe('RoutingInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutingInterceptService = TestBed.get(RoutingInterceptService);
    expect(service).toBeTruthy();
  });
});
