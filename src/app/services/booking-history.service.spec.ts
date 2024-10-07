import { TestBed } from '@angular/core/testing';

import { BookingHistoryService } from './booking-history.service';

describe('BookingHistoryService', () => {
  let service: BookingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
