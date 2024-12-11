import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {ProductComponent} from "./components/product/product.component";
import {ClientComponent} from "./components/client/client.component";
import {OrderComponent} from "./components/order/order.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CartComponent} from "./components/cart/cart.component";

export const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent ,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'product', component: ProductComponent},
      {path: 'client', component: ClientComponent},
      {path: 'order', component: OrderComponent},
      {path: 'cart', component: CartComponent},
    ]},

];
