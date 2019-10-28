import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceDashboardComponent } from './invoice-dashboard/invoice-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatIconModule, 
  MatButtonModule, MatDialogModule, MatFormFieldModule, 
  MatInputModule, MatListModule, MatDatepickerModule, 
  MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceCreateComponent,
    InvoiceEditComponent,
    InvoiceDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  entryComponents: [
    InvoiceCreateComponent
  ]
})
export class InvoiceModule { }
