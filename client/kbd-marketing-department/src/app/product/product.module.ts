import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';
import 'hammerjs';
import { ProductPriceHistoryComponent } from './product-price-history/product-price-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CreateProductComponent, 
    ProductsListComponent, 
    ProductDashboardComponent, ProductPriceHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  entryComponents: [
    CreateProductComponent
  ]
})
export class ProductModule { }
