import { TestBed } from '@angular/core/testing';

import { ProductListHistoryBindService } from './product-list-history-bind.service';

describe('ProductListHistoryBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListHistoryBindService = TestBed.get(ProductListHistoryBindService);
    expect(service).toBeTruthy();
  });
});
