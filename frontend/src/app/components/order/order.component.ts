import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ClientOrderService} from "../../service/client-order.service";
import {ClientOrder} from "../../model/clientOrder";
import {CommonModule, DatePipe} from "@angular/common";
// @ts-ignore
import {Modal} from 'bootstrap';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {Client} from "../../model/client";
import {Router} from "@angular/router";
import {CartItem} from "../../model/cartItem";
import {HomeService} from "../../service/home.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:
    [DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orderList!: ClientOrder[];
  modal: Modal;
  modal2: Modal;
  modal3: Modal;
  orderForm!: FormGroup;
  clients!: Client[];
  client!: Client;
  cartItems!: CartItem[];
  cartform!: FormGroup;
  products!: Product[];
  product!: Product;
  cartItem!: CartItem;
  order!: ClientOrder;
  clientOrder!: ClientOrder;
  edit!: boolean;

  constructor(private os: ClientOrderService,
              private cs: ClientService,
              private hs: HomeService,
              private fb: FormBuilder,
              private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.modal = new Modal(document.getElementById("modal"));
    this.modal2 = new Modal(document.getElementById("confirmModal"));
    this.modal3 = new Modal(document.getElementById("editCartModal"));

    this.os.getAllOrders().subscribe({
      next: data => {
        this.orderList = data.data;
      },
      error: err => {
        console.log(err);
      }
    })
    this.cs.getAllClients().subscribe(({
      next: ({data}) => {
        // console.log(JSON.stringify(data));
        this.clients = data;
      },
      error: error => {
        console.log(error);
      }
    }))

    this.hs.getAllHomeItems().subscribe({
      next: ({data}) => {
        this.products = data;
      },
      error: error => {
        console.log(error);
      }

    })

    this.orderForm = this.fb.group({
      lineTotal: new FormControl(0, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      client: new FormControl('', Validators.required),
    })
    this.cartform = this.fb.group({
      product: new FormControl('', Validators.required),
      totalCount: new FormControl('', Validators.required),
    })
  }

  openModal(order: ClientOrder) {
    this.order = order;
    this.cartItems = order.cartItems;
    const formattedDate = this.datepipe.transform(order.date, 'yyyy-MM-dd');
    this.modal.show();
    // @ts-ignore
    this.client = this.clients.find((c) => c.id === order.client.id);
    this.orderForm.patchValue({
      lineTotal: order.lineTotal,
      date: formattedDate,
      client: this.client,
    });

  }

  updateOrder() {
    // @ts-ignore
    this.clientOrder = new ClientOrder(0, new Date(), new Client(), [], 0)

    this.clientOrder.id = this.order.id;
    this.clientOrder.client = this.orderForm.controls['client'].value;
    this.clientOrder.date = this.orderForm.controls['date'].value;
    this.clientOrder.cartItems = this.cartItems;
    this.clientOrder.lineTotal = this.orderForm.controls['lineTotal'].value;

    this.os.updateOrder(this.clientOrder.id, this.clientOrder).subscribe({
      next: data => {
        if (data.code === 200) {
          alert(data.message);
          this.formReset();
        } else if (data.code === 404) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      },
      error: err => {
        console.log(err);
      }
    })

  }

  formReset() {
    this.orderForm.reset();
    this.cartItems=[];
    this.modal.hide();
    this.initialize();
  }

  deleteOrder() {
    this.modal2.hide();
    this.modal.hide();

    //   delete request
    this.os.deleteOrder(this.order.id).subscribe({
      next: data => {
        if (data.code === 200) {
          alert(data.message);
          this.formReset();
        } else {
          alert(data.message);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteOrderModal() {
    this.modal2.show();
    document.body.classList.add('blur');

    document.getElementById("modal")?.classList.add('blur');

    document.getElementById("confirmModal")?.addEventListener('hidden.bs.modal', function () {
      document.getElementById("modal")?.classList.remove('blur');
    });

  }

  editCartModal(num: number, ci?: CartItem) {
    num === 1 ? this.edit = true : this.edit = false;
    document.body.classList.add('blur');

    document.getElementById("modal")?.classList.add('blur');
    this.modal3.show();

    document.getElementById("editCartModal")?.addEventListener('hidden.bs.modal', function () {
      document.getElementById("modal")?.classList.remove('blur');
    });

    if (this.edit) {
      // @ts-ignore
      this.product = this.products.find((c) => c.id === ci?.product.id);
      this.cartform.patchValue({
        product: this.product,
        totalCount: ci?.totalCount
      })
    }
  }

  editCartItems() {
    if (this.edit) {
      this.cartItem = this.cartform.getRawValue();
      this.cartItems.map((c: CartItem) => {
        c.product.id = this.cartItem.product.id ? c.totalCount = this.cartItem.totalCount : c.totalCount;
        c.product.id = this.cartItem.product.id ? c.total = this.cartItem.totalCount * c.product.price :
          c.total;
      })
      this.lineTotalCalc();
      alert("Products Edited");
      this.modal3.hide();

    } else {
      this.cartItem = this.cartform.getRawValue();
      this.cartItem.total = this.cartItem.product.price * this.cartItem.totalCount;
      this.cartItems.push(this.cartItem);
      // console.log(this.cartItems);
      alert("Products Edited");
      this.lineTotalCalc();
      this.modal3.hide();
    }


  }

  lineTotalCalc() {
    this.order.lineTotal = 0;
    this.cartItems.forEach((c: CartItem) => {
      this.order.lineTotal += c.total;
    })
    this.orderForm.controls['lineTotal'].setValue(this.order.lineTotal);
  }


  deleteProductFromOrder(ci: CartItem) {
    this.cartItems = this.cartItems.filter((c: CartItem) => c.product.id !== ci.product.id);
    this.lineTotalCalc();
    // console.log(this.cartItems);
  }


}

