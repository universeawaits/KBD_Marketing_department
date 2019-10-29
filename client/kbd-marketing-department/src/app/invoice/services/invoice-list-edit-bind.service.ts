import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListEditBindService {
  invoiceSelected = new EventEmitter<any>();

  constructor() { }

  selectInvoice(invoice: any) {
    this.invoiceSelected.emit(invoice);
  }
}
