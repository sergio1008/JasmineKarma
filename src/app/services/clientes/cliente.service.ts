import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteModel } from 'src/app/models/cliente-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url : string = environment.URL_API;
  constructor(private http : HttpClient) {

  }

  getAllClients(){
    return this.http.get(`${this.url}/clients`, {observe : 'response'});
  }
}
