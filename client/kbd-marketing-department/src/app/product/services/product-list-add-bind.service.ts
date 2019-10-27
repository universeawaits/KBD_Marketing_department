import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListAddBindService {
  productAdded = new EventEmitter<any>();

  constructor() { }

  addProduct(product: any) {
    this.productAdded.emit(product);
  }
}
