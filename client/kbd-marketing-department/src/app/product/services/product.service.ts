import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = environment.host + 'products';

  constructor(
    private httpClient: HttpClient
  ) { }

  createProduct(product: any): Observable<any> {
    return this.httpClient.post(
      this.productsUrl,
      {
        Name: product.name,
        Manufacturer: product.manufactorer,
        Category: product.category,
        Price: product.price,
      }
    );
  }

  getAllProducts() {
    return this.httpClient.get(this.productsUrl);
  }
}
