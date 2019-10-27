import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  constructor(
    private createProductDialog: MatDialog
  ) { }

  ngOnInit() { }

  openCreateProductDialog() {
    this.createProductDialog.open(CreateProductComponent);
  }
}
