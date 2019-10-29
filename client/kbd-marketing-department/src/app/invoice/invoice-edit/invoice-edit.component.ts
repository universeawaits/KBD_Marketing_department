import { Component, OnInit } from '@angular/core';
import { InvoiceListEditBindService } from '../services/invoice-list-edit-bind.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { DatePipe } from '@angular/common';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
  editForm: FormGroup;
  invoice: any;

  constructor(
    private invoiceListEditBindService: InvoiceListEditBindService,
    private invoiceService: InvoiceService,
    private snackBarService: SnackBarService,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.invoiceListEditBindService.invoiceSelected.subscribe(
      invoice => {
        this.invoice = invoice;

        this.editForm = new FormGroup({
          'datetime': new FormControl('', Validators.required),
          'adress': new FormControl(invoice.adress, Validators.required),
          'customerDoc': new FormControl(invoice.customerDocumentNumber, Validators.required),
          'productCode': new FormControl(invoice.productCode, Validators.required),
          'totalCount': new FormControl(invoice.totalProductCount, Validators.required)
        });
      }
    );
  }

  submit() {
    let date = new Date(this.editForm.get('datetime').value ? 
      this.datepipe.transform(new Date(this.editForm.get('datetime').value), 'yyyy-MM-dd hh:mm:ss') : 
      this.invoice.dateTime);

    let newInvoice: any = {
      id: this.invoice.id,
      dateTime: date,
      adress: this.editForm.get('adress').value,
      customerDocumentNumber: this.editForm.get('customerDoc').value,
      productCode: this.editForm.get('productCode').value,
      totalProductCount: this.editForm.get('totalCount').value,
    };

    this.invoiceService.editInvoice(newInvoice).subscribe(
      () => { },
      response => {
        if (response.error) {
          this.snackBarService.openSnackBar(response.error);
        }
      }
    );
  }

  changeDate(event: any) {
    if (event.value) {
      this.editForm.get('datetime').setValue(event.value);
    }
  }
}
