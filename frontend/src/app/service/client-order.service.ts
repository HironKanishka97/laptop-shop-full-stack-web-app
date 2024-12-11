import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientOrder} from "../model/clientOrder";
import {ServerResponse} from "../model/serverResponse";
import {Observable} from "rxjs";
import {API_BASE_URL} from "../util/constants";

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {

  constructor(private http: HttpClient) { }

  saveOrder(clientOrder:ClientOrder):Observable<ServerResponse<any>> {
    return this.http.post<ServerResponse<any>>(API_BASE_URL + "/clientOrder/saveClientOrder", clientOrder);
  }

  getAllOrders():Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(API_BASE_URL + "/clientOrder/getAllClientOrders");
  }

  updateOrder(id: number, clientOrder: ClientOrder): Observable<ServerResponse<any>> {
    return this.http.put<ServerResponse<any>>(`${API_BASE_URL}/clientOrder/updateClientOrder/${id}`, clientOrder);
  }

  deleteOrder(id: number): Observable<ServerResponse<any>> {
    return this.http.delete<ServerResponse<any>>(`${API_BASE_URL}/clientOrder/deleteClientOrder/${id}`);
  }
}
