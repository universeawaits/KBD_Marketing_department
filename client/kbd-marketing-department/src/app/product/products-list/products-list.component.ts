import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { ProductListHistoryBindService } from '../services/product-list-history-bind.service';
import { ProductListAddBindService } from '../services/product-list-add-bind.service';
import { ProductListEditBindService } from '../services/product-list-edit-bind.service';
import { MatDialog } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Code',
    'Manufacturer',
    'Name',
    'Category',
    'Price',
    'Actions'
  ];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  products: any[];

  constructor(
    private productService: ProductService,
    private productListHistoryBindService: ProductListHistoryBindService,
    private productListEditBindService: ProductListEditBindService,
    private productListAddBindService: ProductListAddBindService,
    private editProductDialog: MatDialog
  ) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

    this.productListAddBindService.productAdded.subscribe(
      product => {
        this.products.push(product);
        this.dataSource.data = this.products;
      }
    )
  }

  deleteProduct(code: any){
    this.productService.deleteProduct(code).subscribe(
      () => {
        this.products = this.products.filter(product => product.code != code);
        this.dataSource.data = this.products;
      }
    )
  }

  editProduct(product: any) {
    this.editProductDialog.open(EditProductComponent).afterOpened().subscribe(
      () => {
        this.productListEditBindService.selectProduct(product);
      }
    );
  }
}