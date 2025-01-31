import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación reactivo
  public isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para suscribirse

  constructor(private router: Router) { }

  // Método para iniciar sesión
  login(): void {
    this.isLoggedInSubject.next(true); // Actualiza el estado a "autenticado"
    this.router.navigate(['/']); // Redirige al inicio después de iniciar sesión
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedInSubject.next(false); // Actualiza el estado a "no autenticado"
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value; // Devuelve el valor actual del estado
  }
}