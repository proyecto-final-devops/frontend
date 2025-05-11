import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';  // Asegúrate de que el path es correcto

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Método para enviar las credenciales de login
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/usuarios/login`, credentials);
  }

  // Método para registrar un nuevo usuario
  register(data: { name: string; email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/usuarios/register`, data);
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para eliminar el token en el logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Aquí puedes agregar validaciones adicionales del token si es necesario
    return token !== null;
  }
}
