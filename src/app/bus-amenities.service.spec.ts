import { TestBed } from '@angular/core/testing';

import { BusAmenitiesService } from './bus-amenities.service';

describe('BusAmenitiesService', () => {
  let service: BusAmenitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusAmenitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
