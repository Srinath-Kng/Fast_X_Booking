import { TestBed } from '@angular/core/testing';

import { ManagebusService } from './managebus.service';

describe('ManagebusService', () => {
  let service: ManagebusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagebusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
