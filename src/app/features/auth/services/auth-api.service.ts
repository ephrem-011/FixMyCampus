import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  fullName: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5143/api/Auth';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  saveSession(response: LoginResponse): void {
    localStorage.setItem('fixmycampus_token', response.token);
    localStorage.setItem(
      'fixmycampus_user',
      JSON.stringify({
        userId: response.userId,
        fullName: response.fullName,
        role: response.role,
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('fixmycampus_token');
  }

  getUser(): {
    userId: number;
    fullName: string;
    role: string;
  } | null {
    const value = localStorage.getItem('fixmycampus_user');

    return value ? JSON.parse(value) : null;
  }

  logout(): void {
    localStorage.removeItem('fixmycampus_token');
    localStorage.removeItem('fixmycampus_user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
