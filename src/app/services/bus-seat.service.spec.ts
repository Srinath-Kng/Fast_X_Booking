import { TestBed } from '@angular/core/testing';

import { BusSeatService } from './bus-seat.service';

describe('BusSeatService', () => {
  let service: BusSeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
