import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false; // Para mostrar/ocultar la contraseña
  errorMessage = ''; // Mensaje de error

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.usersService.register(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']); // Redirige al login después del registro
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = error.error.message || 'Error en el registro';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }
}