import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../util/constants";
import {Observable} from "rxjs";
import {ServerResponse, TokenResponse} from "../model/serverResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string):Observable<ServerResponse<TokenResponse>> {
   return this.http.post<ServerResponse<TokenResponse>>(`${API_BASE_URL}/user/login`, {username, password});
  }

}
