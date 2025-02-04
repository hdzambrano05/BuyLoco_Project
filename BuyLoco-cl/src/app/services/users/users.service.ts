import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const ruta = [environment.apiUrl, 'users', 'login'].join('/'); // Construye la URL del endpoint
    return this.http.post(ruta, body); // Envía una solicitud POST al backend
  }

  register(userData: any): Observable<any> {
    const ruta = `${environment.apiUrl}/users`; // Construye la URL correctamente
    return this.http.post(ruta, userData); // Envía el objeto de datos directamente
  }

  getUserById(userId: string): Observable<any> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.get<any>(url); // Realiza una solicitud GET para obtener el usuario por su ID
  }
  


}