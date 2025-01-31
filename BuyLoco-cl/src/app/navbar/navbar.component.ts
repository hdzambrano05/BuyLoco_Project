import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false; // Estado local de autenticación

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en el estado de autenticación
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn; // Actualiza el estado local
    });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}