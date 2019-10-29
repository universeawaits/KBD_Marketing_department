import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InvoiceCreateComponent } from '../invoice-create/invoice-create.component';

@Component({
  selector: 'invoice-dashboard',
  templateUrl: './invoice-dashboard.component.html',
  styleUrls: ['./invoice-dashboard.component.scss']
})
export class InvoiceDashboardComponent implements OnInit {
  constructor(
    private createProductDialog: MatDialog
  ) { }

  ngOnInit() { }

  openCreateInvoiceDialog() {
    this.createProductDialog.open(InvoiceCreateComponent);
  }
}
