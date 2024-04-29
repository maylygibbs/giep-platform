import { TestBed } from '@angular/core/testing';

import { TemporaryStorageServiceService } from './temporary-storage-service.service';

describe('TemporaryStorageServiceService', () => {
  let service: TemporaryStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporaryStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
