import { Component, OnInit, EventEmitter } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'max-price-invoice-list',
  templateUrl: './max-price-invoice-list.component.html',
  styleUrls: ['./max-price-invoice-list.component.scss']
})
export class MaxPriceInvoiceListComponent implements OnInit {
  displayedColumns: string[] = [
    'Date',
    'Customer name',
    'Adress',
    'Price'
  ];
  dataSource: MatTableDataSource<any>;
  
  maxInvoices: any;
  dateSelected = new EventEmitter<any>();

  constructor(
    private invoiceService: InvoiceService,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(null);

    this.dateSelected.subscribe(
      date => {
        this.invoiceService.getMaxPriceInvoices(
          this.datepipe.transform(new Date(date), 
          'yyyy-MM-dd hh:mm:ss')
          ).subscribe(
          maxInvoices => {
            this.maxInvoices = maxInvoices;
            this.dataSource.data = this.maxInvoices;
          }
        );
      }
    );
  }
}
