import { TestBed } from '@angular/core/testing';

import { RoutePreservedService } from './route-preserved.service';

describe('RoutePreservedService', () => {
  let service: RoutePreservedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePreservedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
