import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string | null = null; // Variable para manejar el error

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  form: FormGroup<{ email: FormControl<string | null>, name: FormControl<string | null>, password: FormControl<string | null> }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public async onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = 'Favor de completar todos los campos';
      return;
    }

    try {
      const nombre = this.form.value.name ?? '';
      const correo = this.form.value.email ?? '';
      const password = this.form.value.password ?? '';

      const response = await this.authService.register({ name: nombre, email: correo, password }).toPromise();
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/products']);
      } else {
        this.errorMessage = 'Respuesta inesperada del servidor';
      }
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Ocurrió un error';
      console.error(error);
    }
  }
}
