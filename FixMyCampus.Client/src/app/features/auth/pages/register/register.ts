import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly registerForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
    confirmPassword: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { fullName, email, password, confirmPassword } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.registerForm.controls.confirmPassword.setErrors({ passwordMismatch: true });
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.authApi.register({ fullName, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/tickets/my');
      },
      error: (error: { error?: { message?: string } }) => {
        this.errorMessage.set(
          error.error?.message ?? 'Unable to create account. Please try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
