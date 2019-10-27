import { Component, OnInit } from '@angular/core';
import { ProductListHistoryBindService } from '../services/product-list-history-bind.service';

@Component({
  selector: 'product-price-history',
  templateUrl: './product-price-history.component.html',
  styleUrls: ['./product-price-history.component.scss']
})
export class ProductPriceHistoryComponent implements OnInit {

  constructor(
    private productListHistoryBindService: ProductListHistoryBindService
  ) { }

  ngOnInit() {
  }

}
