import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CustomerService } from '../services/customer.service';
import { CustomerListCreateBindService } from '../services/customer-list-create-bind.service';

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

  customers = [];

  constructor(
    private customerService: CustomerService,
    private customerListCreateBindService: CustomerListCreateBindService,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(null);

    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.customers = customers;
        this.dataSource.data = this.customers;
      }
    );

    this.customerListCreateBindService.customerCreated.subscribe(
      customer => {
        this.customers.push(customer);
        this.dataSource.data = this.customers;
      }
    )
  }

  deleteCustomer(documentNumber: any) {
    this.customerService.deleteCustomer(documentNumber).subscribe(
      () => {
        this.customers = this.customers.filter(c => c.documentNumber != documentNumber);
        this.dataSource.data = this.customers;
      }
    );
  }
}
