import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthApi } from '../../features/auth/services/auth-api';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private readonly auth = inject(AuthApi);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const role = this.auth.session?.role;
    const allowedRoles = route.data['roles'] as string[] | undefined;

    if (!role) {
      return this.router.parseUrl('/auth/login');
    }

    if (!allowedRoles || allowedRoles.includes(role)) {
      return true;
    }

    const destination: Record<string, string> = {
      Admin: '/admin/dashboard',
      Reporter: '/reporter/dashboard',
      Technician: '/technician/dashboard',
    };
    return this.router.parseUrl(destination[role] ?? '/auth/login');
  }
}
