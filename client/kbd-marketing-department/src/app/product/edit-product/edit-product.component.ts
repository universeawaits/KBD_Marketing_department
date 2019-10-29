import { Component, OnInit } from '@angular/core';
import { ProductListEditBindService } from '../services/product-list-edit-bind.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  product: any;

  constructor(
    private productService: ProductService,
    private productListEditBindService: ProductListEditBindService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.productListEditBindService.productSelected.subscribe(
      product => {
        this.product = product;

        this.editForm = new FormGroup({
          'name': new FormControl(this.product.name, Validators.required),
          'manufacturer': new FormControl(this.product.manufacturer, Validators.required),
          'category': new FormControl(this.product.category, Validators.required),
          'price': new FormControl(this.product.price, Validators.required),
        });
      }
    );
  }

  submit() {
    let newProduct: any = {
      code: this.product.code,
      name: this.editForm.get('name').value,
      manufacturer: this.editForm.get('manufacturer').value,
      category: this.editForm.get('category').value,
      price: this.editForm.get('price').value,
      oldPrice: this.product.price
    };

    if (
      newProduct.name == this.product.name &&
      newProduct.manufacturer == this.product.manufacturer &&
      newProduct.category == this.product.category &&
      newProduct.price == this.product.price) {
        return;
    }

    this.productService.editProduct(newProduct).subscribe(
      () => { },
      () => {
        this.snackBarService.openSnackBar(
          'Name, manufacturer and category' + 
          ' must be unique per product'
          );
      }
    );

    this.product = newProduct;
  }
}
