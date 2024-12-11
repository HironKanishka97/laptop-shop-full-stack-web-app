import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {CartService} from "../../service/cart.service";
import {CommonModule} from "@angular/common";
import {CartItem} from "../../model/cartItem";
import {Router} from "@angular/router";
// @ts-ignore
import {Modal} from 'bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {Client} from "../../model/client";
import {ClientOrder} from "../../model/clientOrder";
import {ClientOrderService} from "../../service/client-order.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  cartItemsWithCount: CartItem[] = [];
  modalElement!: HTMLElement | null;
  modal!: Modal | null;
  orderForm!: FormGroup;
  clientOrder!: ClientOrder;

  clients: Client[] = [];


  constructor(private cartService: CartService,
              private cs: ClientService,
              private cos: ClientOrderService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // Subscribe to the cart observable to get updates
    this.cartService.cart$.subscribe((cartItems: Product[]) => {
      this.cartItems = cartItems;
      this.getCartItemsWithCount(this.cartItems);
    });
    this.cs.getAllClients().subscribe(({
      next: ({data}) => {
        // console.log(JSON.stringify(data));
        this.clients = data;
      },
      error: error => {
        console.log(error);
      }
    }))

    this.modalElement = document.getElementById('orderModal');
    this.modal = new Modal(this.modalElement!);
    this.initialize();
  }

  initialize() {
    this.orderForm = this.fb.group({
      date: [new Date().toISOString().substring(0, 10)],
      client: ['', Validators.required]
    });
  }

  // Remove product from cart (if you implement this feature in the service)
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  getCartItemsWithCount(cartItems: Product[]) {
    const itemMap = new Map();

    cartItems.forEach(item => {
      if (itemMap.has(item.id)) {
        const existingItem = itemMap.get(item.id);
        existingItem.product.quantity += item.quantity;  // add quantity
        existingItem.totalCount += 1;  // Increment the quantity
      } else {
        itemMap.set(item.id, {product: {...item}, totalCount: 1});  // Initialize the count as 1
      }
    });

    this.cartItemsWithCount = Array.from(itemMap.values());
    // console.log(this.cartItemsWithCount);
  }


  proceedToOrder() {
    this.modal.show();
  }

  addNewClient() {
    this.router.navigate(['/client']);
  }

  placeOrder() {
    if (this.orderForm.valid) {

      this.clientOrder = this.orderForm.value;
      this.clientOrder.cartItems = this.cartItemsWithCount;
      let fullTotal =0;
      for (let cartItem of this.clientOrder.cartItems) {
        cartItem.total = cartItem.product.price * cartItem.totalCount;
        fullTotal += cartItem.total;
      }
      this.clientOrder.lineTotal = fullTotal;
      console.log(JSON.stringify(this.clientOrder));

      this.cos.saveOrder(this.clientOrder).subscribe({
        next: (res) => {
          if(res.code === 200 || res.code === 201) {
            alert(res.message);
            this.resetForm();
          }
         else alert(res.message);
        },
        error: error => {
          console.log(error);
        }
      })
      // this.orderForm.reset();
      // this.modal.hide();
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.orderForm.reset();
    this.modal.hide();
  }

  loadImage(image: string) {
    return atob(image);
  }
}
