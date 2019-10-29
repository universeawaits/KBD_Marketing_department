import { Component, OnInit } from '@angular/core';
import { InvoiceListEditBindService } from '../services/invoice-list-edit-bind.service';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  invoice: any;

  constructor(
    private invoiceListEditBindService: InvoiceListEditBindService
  ) { }

  ngOnInit() {
    this.invoiceListEditBindService.invoiceSelected.subscribe(
      invoice => {
        this.invoice = invoice;
      }
    );
  }
}
