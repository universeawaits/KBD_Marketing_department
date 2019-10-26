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
    let productBody: any = {
      Name: product.name,
      Manufacturer: product.manufacturer,
      Category: product.category,
      Price: product.price,
    };
    return this.httpClient.post<any>(this.productsUrl, productBody);
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
  }
}
