import { TestBed } from '@angular/core/testing';

import { SearchDataTransferService } from './search-data-transfer.service';

describe('SearchDataTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchDataTransferService = TestBed.get(SearchDataTransferService);
    expect(service).toBeTruthy();
  });
});
