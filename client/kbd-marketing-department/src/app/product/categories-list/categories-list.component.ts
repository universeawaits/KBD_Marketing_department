import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material';
import { ProductListAddBindService } from '../services/product-list-add-bind.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Category'
  ];
  dataSource: MatTableDataSource<any>;

  categories: string[];

  constructor(
    private productService: ProductService,
    private productListAddBindService: ProductListAddBindService
  ) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource(this.categories);
      }
    );
    
    this.productListAddBindService.productAdded.subscribe(
      product => {
        this.categories.push(product.category);
        this.dataSource.data = this.categories;
      }
    )
  }
}
