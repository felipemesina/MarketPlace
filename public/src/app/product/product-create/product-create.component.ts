import { Component, OnInit } from '@angular/core';
import { ProductService } from "./../product.service";
import { Product } from './../product';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  newProduct = new Product();
  products: Array<Product> = [];

  constructor(private _productService: ProductService) { }

  ngOnInit() {

  }


  createPost = function (product: Product){
    console.log(product);
    this._productService.createPost(product)
    .subscribe(
      (products) => { this.products.push(product) }
    )

  }


}
