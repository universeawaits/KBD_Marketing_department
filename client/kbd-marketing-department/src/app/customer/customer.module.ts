import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CustomersListComponent,
    CustomerDashboardComponent,
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
