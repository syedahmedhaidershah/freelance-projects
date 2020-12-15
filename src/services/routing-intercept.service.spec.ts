import { TestBed } from '@angular/core/testing';

import { RoutingInterceptService } from './routing-intercept.service';

describe('RoutingInterceptService', () => {
  let service: RoutingInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
