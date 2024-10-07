import { TestBed } from '@angular/core/testing';

import { BoardingPointService } from './boarding-point.service';

describe('BoardingPointService', () => {
  let service: BoardingPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardingPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
