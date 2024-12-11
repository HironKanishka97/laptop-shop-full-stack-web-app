import {Injectable} from '@angular/core';
import {API_BASE_URL} from "../util/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServerResponse, TokenResponse} from "../model/serverResponse";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl = API_BASE_URL

  constructor(private http: HttpClient) {
  }

  getAllHomeItems():Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(API_BASE_URL + "/home/getAllHomeItems")
  }

}
