import { TestBed } from '@angular/core/testing';

import { FbusseatsService } from './fbusseats.service';

describe('FbusseatsService', () => {
  let service: FbusseatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbusseatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
