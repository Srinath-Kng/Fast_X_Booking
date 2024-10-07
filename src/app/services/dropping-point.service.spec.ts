import { TestBed } from '@angular/core/testing';

import { DroppingPointService } from './dropping-point.service';

describe('DroppingPointService', () => {
  let service: DroppingPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroppingPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
