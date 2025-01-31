import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.usersService.login(email, password).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.authService.login()
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error en el login:', error);
          this.errorMessage = error.error.message || 'Error en el inicio de sesión';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}