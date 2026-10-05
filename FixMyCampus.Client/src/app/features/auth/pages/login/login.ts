import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authApi.login(this.loginForm.getRawValue()).subscribe({
      next: (user) => {
        const destinations: Record<string, string> = {
          Admin: '/admin/dashboard',
          Technician: '/technician/dashboard',
          Reporter: '/reporter/dashboard',
        };
        this.loading.set(false);
        void this.router.navigateByUrl(destinations[user.role] ?? '/auth/login');
      },
      error: (error: { error?: { message?: string } }) => {
        this.errorMessage.set(
          error.error?.message ?? 'Unable to sign in. Check your credentials and try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
