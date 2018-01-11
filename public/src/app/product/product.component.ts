import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private _productService: ProductService) {
  }


  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts()
    .subscribe(
      (products) => { this.products = products },
      (err) => { console.log("server returned this error: ", err) },
      () => {}
    )
  }
  }
