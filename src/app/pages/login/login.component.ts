import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';  
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink], // Agrega RouterModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  
  constructor(
    private authService: AuthService,  
    private router: Router,
  ){}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  form: FormGroup<{ correo: FormControl<string | null>, password: FormControl<string | null> }> = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),  
    password: new FormControl('', [Validators.required])
  });

  public async onSubmit() {
    if (this.form.invalid) return;

    try {
      const { correo, password } = this.form.value;

      const response = await this.authService.login({
        correo: correo ?? '',
        password: password ?? ''
      });

   
      localStorage.setItem('correo', response.correo);
      localStorage.setItem('password', response.password);
      localStorage.setItem('tipo_usuario', response.tipo_usuario);

      this.router.navigate(['/shop']);
    } catch (error: any) {
      console.error('Error en login', error);
      alert(error?.error?.error || 'Login fallido');
    }
  }
}
