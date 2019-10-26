import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'manufacturer': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
    })
  }

  submit() {
    this.productService.createProduct(
      {
        name: this.createForm.get('name').value,
        manufacturer: this.createForm.get('manufacturer').value,
        category: this.createForm.get('category').value,
        price: this.createForm.get('price').value,
      }
    ).subscribe(
      () => {
        console.log('product added');
      },
      () => {
        console.log('error');
      },
      () => {
        console.log('continuing');
      }
    );
  }
}
