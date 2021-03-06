import { Component, OnInit } from '@angular/core';
import { ProductListHistoryBindService } from '../services/product-list-history-bind.service';
import { ProductService } from '../services/product.service';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'product-price-history',
  templateUrl: './product-price-history.component.html',
  styleUrls: ['./product-price-history.component.scss']
})
export class ProductPriceHistoryComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Date',
    'Manufacturer',
    'Name',
    'Price'
  ];
  dataSource: MatTableDataSource<any>;
  
  snapshots: any;

  constructor(
    private productService: ProductService,
    private productListHistoryBindService: ProductListHistoryBindService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(null);

    this.productListHistoryBindService.productSelected.subscribe(
      code => {
        this.productService.getProductSnapshots(code).subscribe(
          snapshots => {
            this.snapshots = snapshots;
            this.dataSource.data = this.snapshots;
          }
        );
      }
    );
  }

  changeDateFrom(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.dataSource.data = this.snapshots.filter(
        sn => Date.parse(sn.dateTime) >= event.value.valueOf()
        );
    }
  }

  changeDateTo(event: any) {
    if (event.value) {
      this.dataSource.data = this.snapshots.filter(
        sn => Date.parse(sn.dateTime) <= event.value.valueOf()
        );   
    }
  }
}
