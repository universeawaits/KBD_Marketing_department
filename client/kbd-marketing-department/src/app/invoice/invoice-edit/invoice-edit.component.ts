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
      }
    );

    this.editForm = new FormGroup({
      'datetime': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl(''),
      'country': new FormControl('', Validators.required),
      'customerDoc': new FormControl('', Validators.required),
      'totalPrice': new FormControl('', Validators.required),
      'totalCount': new FormControl('', Validators.required)
    });
  }

  submit() {
    let _region_segment = this.editForm.get('region').value ? 
      this.editForm.get('city').value + ', ' + this.editForm.get('region').value : 
      this.editForm.get('city').value;
    let _adress = _region_segment + ', ' + this.editForm.get('country').value;

    let newInvoice: any = {
      dateTime: this.datepipe.transform(new Date(this.editForm.get('datetime').value), 'yyyy-MM-dd hh:mm:ss'),
      adress: _adress,
      customerDocumentNumber: this.editForm.get('customerDoc').value,
      totalPrice: this.editForm.get('totalPrice').value,
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
