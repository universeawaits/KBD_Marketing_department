import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Type',
    'Name',
    'Personal name',
    'Adress',
    'Document number',
    'Document series',
    'Bank',
    'Actions'
  ];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(null);

    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.dataSource.data = customers;
      }
    )
  }

  deleteCustomer(documentNumber: any) {
    this.customerService.deleteCustomer(documentNumber).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.documentNumber != documentNumber);
      }
    )
  }
}
