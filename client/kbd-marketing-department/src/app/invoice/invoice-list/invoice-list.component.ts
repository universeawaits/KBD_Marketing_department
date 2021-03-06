import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EditProductComponent } from 'src/app/product/edit-product/edit-product.component';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceListEditBindService } from '../services/invoice-list-edit-bind.service';
import { InvoiceListCreateBindService } from '../services/invoice-list-create-bind.service';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Id',
    'Customer doc',
    'Adress',
    'Date',
    'Product code',
    'Price',
    'Amount',
    'Actions'
  ];
  dataSource: MatTableDataSource<any>;

  invoices: any[];

  constructor(
    private invoiceService: InvoiceService,
    private invoiceListEditBindService: InvoiceListEditBindService,
    private invoiceListCreateBindService: InvoiceListCreateBindService,
    private editInvoiceDialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(null);

    this.invoiceService.getAllInvoices().subscribe(
      products => {
        this.invoices = products;
        this.dataSource = new MatTableDataSource(this.invoices);
      }
    );

    this.invoiceListCreateBindService.invoiceCreated.subscribe(
      invoice => {
        this.invoices.push(invoice);
        this.dataSource.data = this.invoices;
      }
    )
  }

  deleteInvoice(id: any){
    this.invoiceService.deleteInvoice(id).subscribe(
      () => {
        this.invoices = this.invoices.filter(invoice => invoice.id != id);
        this.dataSource.data = this.invoices;
      }
    )
  }

  editInvoice(invoice: any) {
    this.editInvoiceDialog.open(InvoiceEditComponent).afterOpened().subscribe(
      () => {
        this.invoiceListEditBindService.selectInvoice(invoice);
      }
    );
  }
}
