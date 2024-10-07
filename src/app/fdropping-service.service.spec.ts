import { TestBed } from '@angular/core/testing';

import { FDroppingServiceService } from './fdropping-service.service';

describe('FDroppingServiceService', () => {
  let service: FDroppingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FDroppingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
