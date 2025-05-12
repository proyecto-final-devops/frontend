import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; password: string }) {
    return firstValueFrom(
      this.http.post<{
        id: number;
        correo: string;
        password: string;
        tipo_usuario: string;
      }>(`${this.apiUrl}/login`, credentials)
    );
  }
  registerUser(data: {
    username: string,
    correo: string,
    password: string,
    tipo_usuario: string
  }) {
    console.log('Datos enviados al backend:', data); // Log para depuración
    return firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/register`, data)
    ).catch(error => {
      console.error('Error en la solicitud de registro:', error); // Log de errores
      throw error;
    });
  }
  
}
