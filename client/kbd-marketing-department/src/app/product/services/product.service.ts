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

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
  }

  createProduct(product: any): Observable<any> {
    let productBody: any = {
      Name: product.name,
      Manufacturer: product.manufacturer,
      Category: product.category,
      Price: product.price,
    };
    return this.httpClient.post<any>(this.productsUrl, productBody);
  }

  deleteProduct(code: any) {
    return this.httpClient.delete(this.productsUrl + '?code=' + code);
  }

  editProduct(product: any) {
    let productBody: any = {
      Code: product.code,
      Name: product.name,
      Manufacturer: product.manufacturer,
      Category: product.category,
      Price: product.price,
      OldPrice: product.oldPrice
    };
    return this.httpClient.put(this.productsUrl, productBody);
  }

  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.productsUrl + '/categories');
  }

  getProductSnapshots(code: any): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl + '/snapshots?code=' + code);
  }
}
