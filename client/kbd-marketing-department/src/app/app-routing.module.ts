import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDashboardComponent } from './product/product-dashboard/product-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { InvoiceDashboardComponent } from './invoice/invoice-dashboard/invoice-dashboard.component';


const routes: Routes = [
  { path: 'products', component: ProductDashboardComponent },
  { path: 'customers', component: CustomerDashboardComponent },
  { path: 'invoices', component: InvoiceDashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
