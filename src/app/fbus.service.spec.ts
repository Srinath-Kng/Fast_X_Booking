import { TestBed } from '@angular/core/testing';

import { FbusService } from './fbus.service';

describe('FbusService', () => {
  let service: FbusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
