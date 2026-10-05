import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const stored = localStorage.getItem('fixmycampus.auth');

    if (stored && request.url.startsWith('/api/')) {
      try {
        const token = (JSON.parse(stored) as { token?: string }).token;

        if (token) {
          request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
      } catch {
        localStorage.removeItem('fixmycampus.auth');
      }
    }

    return next.handle(request);
  }
}
