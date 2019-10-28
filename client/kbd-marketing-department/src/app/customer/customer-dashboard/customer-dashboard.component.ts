import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateProductComponent } from 'src/app/product/create-product/create-product.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

@Component({
  selector: 'customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(
    private createCustomerDialog: MatDialog
  ) { }

  ngOnInit() { }

  openCreateCustomerDialog() {
    this.createCustomerDialog.open(CreateCustomerComponent);
  }
}
