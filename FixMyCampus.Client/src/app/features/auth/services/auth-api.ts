import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly apiUrl = '/api/Auth';
  private readonly storageKey = 'fixmycampus.auth';

  constructor(private readonly http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.authenticate(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.authenticate(`${this.apiUrl}/register`, request);
  }

  private authenticate(
    url: string,
    request: LoginRequest | RegisterRequest,
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(url, request)
      .pipe(tap((response) => localStorage.setItem(this.storageKey, JSON.stringify(response))));
  }

  get token(): string | null {
    return this.session?.token ?? null;
  }

  get session(): LoginResponse | null {
    const stored = localStorage.getItem(this.storageKey);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as LoginResponse;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
