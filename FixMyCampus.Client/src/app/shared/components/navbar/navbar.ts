import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../../features/auth/services/auth-api';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);
  readonly userName = computed(() => this.authApi.session?.fullName ?? 'User');
  readonly userRole = computed(() => this.authApi.session?.role ?? '');

  logout(): void {
    this.authApi.logout();
    void this.router.navigateByUrl('/auth/login');
  }
}
