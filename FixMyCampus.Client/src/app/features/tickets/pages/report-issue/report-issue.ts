import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TicketCreateRequest, TicketApi } from '../../services/ticket-api';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrl: './report-issue.scss',
  templateUrl: './report-issue.html',
})
export class ReportIssue {
  private readonly fb = inject(FormBuilder);
  private readonly ticketApi = inject(TicketApi);
  private readonly router = inject(Router);

  readonly submitting = signal(false);

  readonly reportForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['General Facilities', [Validators.required]],
    room: ['', [Validators.required]],
    buildingId: [1, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['Medium' as const, [Validators.required]],
  });

  submit(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    const request: TicketCreateRequest = {
      ...this.reportForm.getRawValue(),
      priority: this.reportForm.getRawValue().priority ?? 'Medium',
    };

    this.ticketApi.createTicket(request).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl('/tickets/my');
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}
