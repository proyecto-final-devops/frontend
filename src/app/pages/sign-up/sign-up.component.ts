import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';  


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  form: FormGroup<{
    correo: FormControl<string | null>,
    username: FormControl<string | null>,
    password: FormControl<string | null>,
    tipo_usuario: FormControl<string | null>
  }> = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tipo_usuario: new FormControl('', [Validators.required])
  });

  public async onSubmit() {
    if (this.form.invalid) {
      console.warn('Formulario inválido:', this.form.errors); 
      console.log('Estado de los controles:', {
        correo: this.form.get('correo')?.errors,
        username: this.form.get('username')?.errors,
        password: this.form.get('password')?.errors,
        tipo_usuario: this.form.get('tipo_usuario')?.errors,
      }); // Log para identificar qué campo falla
      return;
    }

    try {
      const { correo, username, password, tipo_usuario } = this.form.value;

      console.log('Datos del formulario:', this.form.value); // Log para depuración

      const response = await this.authService.registerUser({
        correo: correo ?? '',
        username: username ?? '',
        password: password ?? '',
        tipo_usuario: tipo_usuario ?? ''
      });

      console.log('Respuesta del backend:', response); // Log para depuración

      // Aquí puedes guardar lo que necesites
      localStorage.setItem('correo', response.correo);
      localStorage.setItem('tipo_usuario', response.tipo_usuario);

      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error en registro:', error);
      alert(error?.error?.error || 'Registro fallido');
    }
  }
}
