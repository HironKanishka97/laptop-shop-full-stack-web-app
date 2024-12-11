import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServerResponse} from "../model/serverResponse";
import {API_BASE_URL} from "../util/constants";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClients():Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(API_BASE_URL + "/client/getAllClients");
  }

  updateClient(id: number, newClient: Client):Observable<ServerResponse<any>> {
    return this.http.put<ServerResponse<any>>(API_BASE_URL + `/client/updateClient/${id}` , newClient);
  }
  deleteClient(id: number):Observable<ServerResponse<any>> {
    return this.http.delete<ServerResponse<any>>(API_BASE_URL + `/client/deleteClient/${id}`);
  }

  saveClient(client:Client):Observable<ServerResponse<any>> {
    return this.http.post<ServerResponse<any>>(API_BASE_URL + "/client/saveClient", client);
  }
}
