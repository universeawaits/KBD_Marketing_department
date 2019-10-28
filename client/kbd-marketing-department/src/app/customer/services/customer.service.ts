import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = environment.host + 'customers';

  constructor(
    private httpClient: HttpClient
  ) { }

  createCustomer(customer: any): Observable<any> {
    let newCustomer: any = {
      Type: customer.type,
      Name: customer.name,
      PersonName: customer.personName,
      Adress: customer.adress,
      DocumentNumber: customer.documentNumber,
      DocumentSeries: customer.documentSeries,
      BankNumber: customer.bankNumber
    };
    return this.httpClient.post<any>(this.customersUrl, newCustomer);
  }

  getAllBanks(): Observable<any> {
    return this.httpClient.get<any>(this.customersUrl + '/banks');
  }

  getAllCustomers(): Observable<any> {
    return this.httpClient.get<any>(this.customersUrl);
  }

  public deleteCustomer(documentNumber: any) {
    return this.httpClient.delete(this.customersUrl + '?documentNumber=' + documentNumber);
  }
}
