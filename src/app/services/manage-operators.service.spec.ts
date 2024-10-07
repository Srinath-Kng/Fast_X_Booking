import { TestBed } from '@angular/core/testing';

import { ManageOperatorsService } from './manage-operators.service';

describe('ManageOperatorsService', () => {
  let service: ManageOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
