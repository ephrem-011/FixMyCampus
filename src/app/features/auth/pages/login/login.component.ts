import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApiService);

  submitting = false;
  errorMessage = '';

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.authApi.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.authApi.saveSession(response);
        this.submitting = false;

        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/tickets']);
        }
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password. Please try again.';
      },
    });
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }
}
