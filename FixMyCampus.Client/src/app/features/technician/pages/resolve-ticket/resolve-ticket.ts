import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../../../features/tickets/services/ticket-api';

@Component({
  selector: 'app-resolve-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './resolve-ticket.scss',
  templateUrl: './resolve-ticket.html',
})
export class ResolveTicket implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly ticketApi = inject(TicketApi);

  readonly ticket = signal<Ticket | undefined>(undefined);
  readonly resolving = signal(false);

  readonly form = this.fb.nonNullable.group({
    resolution: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketApi.getTicketById(id).subscribe((ticket) => this.ticket.set(ticket));
  }

  resolve(): void {
    const ticket = this.ticket();

    if (!ticket || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.resolving.set(true);
    this.ticketApi.updateTicketStatus(ticket.id, 'Resolved').subscribe({
      next: () => {
        this.resolving.set(false);
        this.router.navigateByUrl('/technician/assigned');
      },
      error: () => this.resolving.set(false),
    });
  }
}
