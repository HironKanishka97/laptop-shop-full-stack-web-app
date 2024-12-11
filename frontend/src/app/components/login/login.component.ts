import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {ServerResponse, TokenResponse} from "../../model/serverResponse";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login =new Login();
  isLoading: boolean = false;
  private ls: LoginService = inject(LoginService)

  constructor(private router:Router) {
  }

  onLogin() {
    this.isLoading = true;
    this.ls.login(this.loginObj.userName, this.loginObj.password).subscribe({
      next: (result:ServerResponse<TokenResponse> )=> {
        this.isLoading = false;
        if (result) {
          // console.log(result);
          localStorage.setItem("token",result.data.token);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert("Invalid Credentials");
        }
      },
      error: error => {
        alert("logging Failed" + error.message);
        console.log(error);
      }
    })
  }

  onRegister() {

  }
}


export class Login {
  userName: string='';
  password: string='';
  constructor() {
  }
}
