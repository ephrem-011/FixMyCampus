import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketApiService } from '../../services/ticket-api.service';
import { TicketUrgency } from '../../../../Core/models/ticket.model';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report-issue.html',
  styleUrl: './report-issue.scss',
})
export class ReportIssue {
  private readonly fb = inject(FormBuilder);
  private readonly ticketApi = inject(TicketApiService);
  private readonly router = inject(Router);

  submitting = false;
  errorMessage = '';

  readonly categories = [
    'Wi-Fi / Internet',
    'Computer / Lab Equipment',
    'Projector',
    'Electrical',
    'Plumbing / Water',
    'Furniture',
    'Other',
  ];

  readonly buildings = [
    'Engineering Building',
    'Main Building',
    'Library',
    'Science Building',
    'Administration Building',
  ];

  readonly urgencies: TicketUrgency[] = ['Low', 'Medium', 'High'];

  readonly issueForm = this.fb.nonNullable.group({
    category: ['', Validators.required],
    building: ['', Validators.required],
    room: ['', [Validators.required, Validators.maxLength(50)]],
    urgency: this.fb.nonNullable.control<TicketUrgency>(
      'Medium',
      Validators.required
    ),
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitIssue(): void {
    if (this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.ticketApi.createTicket(this.issueForm.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage =
          error?.error?.message ||
          'Unable to submit the issue. Please try again.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/tickets']);
  }
}