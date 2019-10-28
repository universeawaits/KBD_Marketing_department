import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerListCreateBindService {
  customerCreated = new EventEmitter<any>();

  constructor() { }

  createCustomer(customer: any) {
    this.customerCreated.emit(customer);
  }
}
