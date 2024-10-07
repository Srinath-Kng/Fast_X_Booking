import { TestBed } from '@angular/core/testing';

import { FBoardingServiceService } from './fboarding-service.service';

describe('FBoardingServiceService', () => {
  let service: FBoardingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FBoardingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
