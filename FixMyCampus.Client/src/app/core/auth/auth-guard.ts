import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthApi } from '../../features/auth/services/auth-api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly auth = inject(AuthApi);
  private readonly router = inject(Router);

  canActivate(): boolean | UrlTree {
    return this.auth.session ? true : this.router.parseUrl('/auth/login');
  }
}
