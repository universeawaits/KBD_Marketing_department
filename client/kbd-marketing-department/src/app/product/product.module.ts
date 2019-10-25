import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import 'hammerjs';



@NgModule({
  declarations: [
    CreateProductComponent, 
    ProductsListComponent, 
    ProductDashboardComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ProductModule { }
