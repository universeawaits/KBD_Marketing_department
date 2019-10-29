import { TestBed } from '@angular/core/testing';

import { InvoiceListCreateBindService } from './invoice-list-create-bind.service';

describe('InvoiceListCreateBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceListCreateBindService = TestBed.get(InvoiceListCreateBindService);
    expect(service).toBeTruthy();
  });
});
