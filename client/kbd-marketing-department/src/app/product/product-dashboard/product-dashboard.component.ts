import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  private createProductDialogConfig: MatDialogConfig;

  constructor(
    private createProductDialog: MatDialog
  ) { }

  ngOnInit() { 
    this.createProductDialogConfig = new MatDialogConfig();
  }

  openCreateProductDialog() {
    this.createProductDialog.open(CreateProductComponent, this.createProductDialogConfig);
  }
}
