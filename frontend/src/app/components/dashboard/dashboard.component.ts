import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Product} from "../../model/product";
import {CommonModule, NgForOf} from "@angular/common";
import {CartService} from "../../service/cart.service";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  productsList!: Product[];
  constructor(private hs: HomeService,private cs:CartService) {
  }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.hs.getAllHomeItems().subscribe({
      next: data => {
        // console.log(data.data);
        this.productsList = data.data;
      },
      error: err => {
        console.log(err.message);
      }
    })
  }

  addToCart(product: Product): void {
    this.cs.addToCart(product);  // cart service call
    alert(`${product.name} added to cart`);

  }


  loadImage(image: string) {
    return atob(image);
  }
}
