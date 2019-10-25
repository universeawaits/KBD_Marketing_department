import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  actions: any[] = [
    { path: 'products', name: 'Products' },
    { path: 'invoices', name: 'Invoices' },
    { path: 'customers', name: 'Customers' }
  ];

  constructor() { }

  ngOnInit() { }
}
