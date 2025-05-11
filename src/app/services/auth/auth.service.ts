import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment';

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
}
