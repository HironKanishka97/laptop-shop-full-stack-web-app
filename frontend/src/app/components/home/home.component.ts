import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HomeService} from "../../service/home.service";
// @ts-ignore
import {Modal} from 'bootstrap';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  modal: any;
  loggedUser:boolean=true
  loggedUserMsg!:string;

  constructor(private hs: HomeService ,private router: Router) {
  }

  ngOnInit() {
    this.loadData();
    const modalElement = document.getElementById('logoutModal');
    this.modal = new Modal(modalElement);
  }

  loadData() {
    this.hs.getAllHomeItems().subscribe({
      next: data => {
      },
      error: err => {
        console.log(err.message);
        this.loggedUser = false;
        this.loggedUserMsg="User Not Logged In";
      }
    })
  }

  loadModal() {
    this.modal.show();
  }

  logout() {
    localStorage.removeItem('token');
    this.modal.hide();
    this.router.navigateByUrl('/login');
  }

  logInAgain() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
