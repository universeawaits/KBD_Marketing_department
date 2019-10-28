import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { CustomerService } from '../services/customer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  types = [
    'Legal',
    'Individual'
  ];
  banks = [];

  createForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    //private productListAddBindService: ProductListAddBindService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.customerService.getAllBanks().subscribe(
      banks => {
        this.banks = banks;
      }
    )

    this.createForm = new FormGroup({
      'type': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'personName': new FormControl('', Validators.required),
      'adress': new FormControl('', Validators.required),
      'documentNumber': new FormControl('', Validators.required),
      'documentSeries': new FormControl('', Validators.required),
      'bankNumber': new FormControl('', Validators.required)
    });
  }

  submit() {
    let newCustomer = {
      type: this.createForm.get('type').value,
      name: this.createForm.get('name').value,
      personName: this.createForm.get('personName').value,
      adress: this.createForm.get('adress').value,
      documentNumber: this.createForm.get('documentNumber').value,
      documentSeries: this.createForm.get('documentSeries').value, 
      bankNumber: this.createForm.get('bankNumber').value
    };

    this.customerService.createCustomer(newCustomer).subscribe(
      product => {
        //this.productListAddBindService.addProduct(product)
      },
      () => {
        this.snackBarService.openSnackBar(
          'Documents must be unique per customer'
          );
      }
    );
  }
}
