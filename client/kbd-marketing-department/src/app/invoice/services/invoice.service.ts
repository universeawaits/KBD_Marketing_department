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
      ProductCode: invoice.productCode,
      CustomerDocumentNumber: invoice.customerDocumentNumber
    };
    return this.httpClient.post<any>(this.invoicesUrl, invoiceBody);
  }

  deleteInvoice(id: any) {
    return this.httpClient.delete(this.invoicesUrl + '?id=' + id);
  }

  editInvoice(invoice: any): Observable<string> {
    let invoiceBody: any = {
      Id: invoice.id,
      DateTime: invoice.dateTime,
      Adress: invoice.adress,
      TotalProductCount: invoice.totalProductCount,
      ProductCode: invoice.productCode,
      CustomerDocumentNumber: invoice.customerDocumentNumber
    };
    return this.httpClient.put<string>(this.invoicesUrl, invoiceBody);
  }

  getMaxPriceInvoices(dateTime: any) {
    return this.httpClient.get(this.invoicesUrl + '/maxPrice?dateTime=' + dateTime);
  }
}
