import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { ProductModule } from './product/product.module';
import { MatSnackBarModule } from '@angular/material';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/invoice.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,
    NavModule,
    ProductModule,
    InvoiceModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
