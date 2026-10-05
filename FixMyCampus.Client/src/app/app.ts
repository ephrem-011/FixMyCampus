import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthApi } from './features/auth/services/auth-api';
import { Navbar } from './shared/components/navbar/navbar';
import { Sidebar } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Navbar, RouterOutlet, Sidebar],
})
export class App {
  private readonly authApi = inject(AuthApi);
  readonly isAuthenticated = computed(() => this.authApi.session !== null);
  protected readonly title = signal('FixMyCampus.Client');
}
