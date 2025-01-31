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
  
  // Método para cerrar sesión (opcional)
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del localStorage
  }

  // Método para verificar si el usuario está autenticado (opcional)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si existe un token en el localStorage
  }
}