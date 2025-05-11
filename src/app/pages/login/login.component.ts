import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null; // Variable para manejar el error

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  form: FormGroup<{ email: FormControl<string | null>, password: FormControl<string | null> }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public async onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = 'Favor de completar todos los campos';
      return;
    }

    try {
      const correo = this.form.value.email?.trim() ?? '';
      const password = this.form.value.password?.trim() ?? '';

      const response = await this.authService.login({ email: correo, password }).toPromise();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/shop']);
      } else {
        this.errorMessage = 'Respuesta inesperada del servidor';
      }
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Ocurrió un error al iniciar sesión';
      console.error('Error en login:', error);
    }
  }
}
