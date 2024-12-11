import {Product} from "./product";


export class CartItem {
  id: number;
  product: Product ;
  totalCount: number;
  total: number;


  constructor(id: number, product: Product, quantity: number, total: number) {
    this.id = id;
    this.product = product;
    this.totalCount = quantity;
    this.total = total;
  }
}
