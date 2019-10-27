import { TestBed } from '@angular/core/testing';

import { ProductListAddBindService } from './product-list-add-bind.service';

describe('ProductListAddBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductListAddBindService = TestBed.get(ProductListAddBindService);
    expect(service).toBeTruthy();
  });
});
