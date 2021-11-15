import { TestBed } from '@angular/core/testing';

import { ShareDataServiceService } from './share-data-service.service';

describe('ShareDataServiceService', () => {
  let service: ShareDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
