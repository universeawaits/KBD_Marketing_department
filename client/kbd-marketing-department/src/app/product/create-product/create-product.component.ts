import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ProductListAddBindService } from '../services/product-list-add-bind.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private productService: ProductService,
    private productListAddBindService: ProductListAddBindService,
    private snackBarService: SnackBarService
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
    let newProduct: any = {
      name: this.createForm.get('name').value,
      manufacturer: this.createForm.get('manufacturer').value,
      category: this.createForm.get('category').value,
      price: this.createForm.get('price').value
    };

    this.productService.createProduct(newProduct).subscribe(
      product => {
        this.productListAddBindService.addProduct(product)
      },
      () => {
        this.snackBarService.openSnackBar(
          'Name, manufacturer and category' + 
          ' must be unique per product'
          );
      }
    );
  }
}
