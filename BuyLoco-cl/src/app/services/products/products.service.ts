import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    protected http: HttpClient
  ) { }

  getProducts(): Observable<any> {
    let ruta = [environment.apiUrl, 'products'].join('/');
    return this.http.get(ruta);
  }
}
