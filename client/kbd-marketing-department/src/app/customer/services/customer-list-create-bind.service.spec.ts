import { TestBed } from '@angular/core/testing';

import { CustomerListCreateBindService } from './customer-list-create-bind.service';

describe('CustomerListCreateBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerListCreateBindService = TestBed.get(CustomerListCreateBindService);
    expect(service).toBeTruthy();
  });
});
