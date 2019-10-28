import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = [ 
    'Type',
    'Name',
    'Person name',
    'Adress',
    'Document number',
    'Bank number'
  ];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(null);
  }

}
