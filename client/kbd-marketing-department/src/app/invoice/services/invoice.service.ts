import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoicesUrl = environment.host + 'invoices';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllInvoices(): Observable<any> {
    return this.httpClient.get<any>(this.invoicesUrl);
  }

  createInvoice(invoice: any): Observable<any> {
    let invoiceBody: any = {
      DateTime: invoice.dateTime,
      Adress: invoice.adress,
      TotalProductCount: invoice.totalProductCount,
      TotalPrice: invoice.totalPrice,
      CustomerDocumentNumber: invoice.customerDocumentNumber
    };
    return this.httpClient.post<any>(this.invoicesUrl, invoiceBody);
  }

  deleteInvoice(id: any) {
    return this.httpClient.delete(this.invoicesUrl + '?id=' + id);
  }

  editInvoice(product: any) {
    let productBody: any = {
      Code: product.code,
      Name: product.name,
      Manufacturer: product.manufacturer,
      Category: product.category,
      Price: product.price,
      OldPrice: product.oldPrice
    };
    return this.httpClient.put(this.invoicesUrl, productBody);
  }
}
