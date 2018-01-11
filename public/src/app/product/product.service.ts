import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from './product';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';


@Injectable()
export class ProductService {
  constructor(private _http: Http) { }

  getProducts(): Observable<Product[]>{
    return this._http.get("/products").map( data => <Product[]>data.json())
}


  createPost(product: Product){
    return this._http.post("/products", product)
    .map( data => data.json())

  }


}
