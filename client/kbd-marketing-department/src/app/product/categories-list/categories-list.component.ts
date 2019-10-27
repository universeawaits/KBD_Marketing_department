import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material';

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
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource(this.categories);
      }
    )
  }
}
