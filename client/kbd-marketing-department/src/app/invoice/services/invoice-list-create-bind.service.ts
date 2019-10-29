import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceListCreateBindService {
  invoiceCreated = new EventEmitter<any>();

  constructor() { }

  createInvoice(invoice: any) {
    this.invoiceCreated.emit(invoice);
  }
}
