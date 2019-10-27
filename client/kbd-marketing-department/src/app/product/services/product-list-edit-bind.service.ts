import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListEditBindService {
  productSelected = new EventEmitter<any>();

  constructor() { }

  selectProduct(product: any) {
    this.productSelected.emit(product);
  }
}
