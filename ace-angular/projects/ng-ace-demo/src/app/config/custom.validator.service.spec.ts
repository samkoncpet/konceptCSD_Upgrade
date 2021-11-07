import { TestBed } from '@angular/core/testing';

import { Custom.ValidatorService } from './custom.validator.service';

describe('Custom.ValidatorService', () => {
  let service: Custom.ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Custom.ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
