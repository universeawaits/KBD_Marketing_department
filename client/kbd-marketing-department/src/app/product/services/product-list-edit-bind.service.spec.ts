import { TestBed } from '@angular/core/testing';

import { ProductListEditBindService } from './product-list-edit-bind.service';

describe('ProductListEditBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListEditBindService = TestBed.get(ProductListEditBindService);
    expect(service).toBeTruthy();
  });
});
