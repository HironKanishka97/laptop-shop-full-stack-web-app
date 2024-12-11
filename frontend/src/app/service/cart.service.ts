import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from "../model/product";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart'; // Key to store cart data in localStorage
  private cartSource = new BehaviorSubject<Product[]>(this.loadCartFromLocalStorage());
  cart$ = this.cartSource.asObservable();  // Observable for other components to subscribe

  constructor() {}

  // Add a product to the cart
  addToCart(product: Product): void {
    const currentCart = this.cartSource.value;
    const updatedCart = [...currentCart, product];
    this.cartSource.next(updatedCart);  // Update the cart state
    this.saveCartToLocalStorage(updatedCart);  // Save cart to localStorage
  }

  // Remove a product from the cart
  removeFromCart(product: Product): void {
    const currentCart = this.cartSource.value;
    const updatedCart = currentCart.filter(p => p.id !== product.id);  // Filter out the product
    this.cartSource.next(updatedCart);  // Update the cart state
    this.saveCartToLocalStorage(updatedCart);  // Update cart in localStorage
  }

  // Get current cart value
  getCart(): Product[] {
    return this.cartSource.value;
  }

  // Load cart from localStorage
  private loadCartFromLocalStorage(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];  // Return parsed cart or empty array
  }

  // Save cart to localStorage
  private saveCartToLocalStorage(cart: Product[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Clear the cart
  clearCart(): void {
    this.cartSource.next([]);  // Reset the cart state
    localStorage.removeItem(this.cartKey);  // Remove from localStorage
  }
}
