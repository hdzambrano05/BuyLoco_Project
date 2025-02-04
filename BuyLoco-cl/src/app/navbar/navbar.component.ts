import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = '';

  constructor(private authService: AuthService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        const userId = this.authService.getUserId();
        if (userId) {
          this.getUsernameById(userId);
        }
      }
    });
  }

  getUsernameById(userId: string): void {
    this.usersService.getUserById(userId).subscribe(
      (user) => {
        this.username = user.name; // Supongo que el campo del nombre es `name`
      },
      (error) => {
        console.error('Error al obtener el nombre del usuario', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
