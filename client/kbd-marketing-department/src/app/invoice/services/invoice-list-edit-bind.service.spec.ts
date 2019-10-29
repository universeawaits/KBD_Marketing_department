import { TestBed } from '@angular/core/testing';

import { InvoiceListEditBindService } from './invoice-list-edit-bind.service';

describe('InvoiceListEditBindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceListEditBindService = TestBed.get(InvoiceListEditBindService);
    expect(service).toBeTruthy();
  });
});
