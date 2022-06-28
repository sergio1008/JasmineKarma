import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ADD_AUTHORIZATION_TOKEN } from '../interceptor/auth.interceptor';
import { ProductoModel } from '../models/producto-model';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url : string = environment.URL_API;
  constructor(private http : HttpClient) {

  }
  public getProducts(): Promise<ProductoModel[]>{
    return this.http.get(`${this.url}/products`,{observe: 'response'} ).toPromise().then(data => {
        if(data.status == 200){
          return data.body as ProductoModel[]
        }else{
          throw new Error('Ocurrio un error en la consulta de products');
        }
    });
  }

  public getProductById(id: number): Promise<ProductoModel>{
     return this.http.get(`${this.url}/products/${id}`, {observe: 'response', context: new HttpContext().set(ADD_AUTHORIZATION_TOKEN, false)}).toPromise().then(data => {
      if(data.status == 200){
        return data.body as ProductoModel;
      }else{
        throw new Error('Ocurrio un error en la consulta de products por id');
      }
  });
  }

  public getProductByName(name: string): Promise<Array<ProductoModel>>{
    return this.http.get(`${this.url}/products?name_like=${name}`,{observe : 'response'}).toPromise()
    .then(data =>{
      if(data.status == 200){
        return data.body as Array<ProductoModel>;
      }else{
        throw new Error('Ocurrio un error en la consulta de products por nombre');
      }
    });
  }
}


