import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(id: string, name: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
    localStorage.setItem('username', name); // Almacena el nombre del usuario
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  private checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
