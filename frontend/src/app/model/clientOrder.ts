import {CartItem} from "./cartItem";
import {Client} from "./client";

export class ClientOrder {
  id: number;
  date: Date;
  client: Client;
  cartItems: CartItem[];
  lineTotal: number;


  constructor(id: number, date: Date, client: Client, cartItems: CartItem[], lineTotal: number) {
    this.id = id;
    this.date = date;
    this.client = client;
    this.cartItems = cartItems;
    this.lineTotal = lineTotal;
  }
}
