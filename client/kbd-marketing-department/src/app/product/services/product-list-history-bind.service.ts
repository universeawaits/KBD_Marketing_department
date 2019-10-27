import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListHistoryBindService {
  productSelected = new EventEmitter<any>();

  constructor() { }

  selectProduct(code: any) {
    this.productSelected.emit(code);
  }
}
