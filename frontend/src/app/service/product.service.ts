import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../model/client";
import {Observable} from "rxjs";
import {ServerResponse} from "../model/serverResponse";
import {API_BASE_URL} from "../util/constants";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient ) { }

  getAllProducts():Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(API_BASE_URL + "/product/getAllProducts");
  }

  updateProduct(id: number, newProduct: Product):Observable<ServerResponse<any>> {
    return this.http.put<ServerResponse<any>>(API_BASE_URL + `/product/updateProduct/${id}` , newProduct);
  }
  deleteProduct(id: number):Observable<ServerResponse<any>> {
    return this.http.delete<ServerResponse<any>>(API_BASE_URL + `/product/deleteProduct/${id}`);
  }
  saveProduct(product:Product):Observable<ServerResponse<any>> {
    return this.http.post<ServerResponse<any>>(API_BASE_URL + "/product/saveProduct", product);
  }

}
