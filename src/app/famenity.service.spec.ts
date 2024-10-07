import { TestBed } from '@angular/core/testing';

import { FamenityService } from './famenity.service';

describe('FamenityService', () => {
  let service: FamenityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamenityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
