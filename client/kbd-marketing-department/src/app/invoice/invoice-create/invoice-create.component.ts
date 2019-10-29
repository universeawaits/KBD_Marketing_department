import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { InvoiceListCreateBindService } from '../services/invoice-list-create-bind.service';
import { InvoiceService } from '../services/invoice.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private invoiceService: InvoiceService,
    private invoiceListCreateBindService: InvoiceListCreateBindService,
    private snackBarService: SnackBarService,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
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
    let _region_segment = this.createForm.get('region').value ? 
      this.createForm.get('city').value + ', ' + this.createForm.get('region').value : 
      this.createForm.get('city').value;
    let _adress = _region_segment + ', ' + this.createForm.get('country').value;

    let newInvoice: any = {
      dateTime: this.datepipe.transform(new Date(this.createForm.get('datetime').value), 'yyyy-MM-dd hh:mm:ss'),
      adress: _adress,
      customerDocumentNumber: this.createForm.get('customerDoc').value,
      totalPrice: this.createForm.get('totalPrice').value,
      totalProductCount: this.createForm.get('totalCount').value,
    };

    this.invoiceService.createInvoice(newInvoice).subscribe(
      () => {
        this.invoiceListCreateBindService.createInvoice(newInvoice);
      },
      error => {
        this.snackBarService.openSnackBar(
          'Customer doc and date must be unique per invoice record'
          );
      }
    );
  }

  changeDate(event: any) {
    if (event.value) {
      this.createForm.get('datetime').setValue(event.value);
    }
  }
}
