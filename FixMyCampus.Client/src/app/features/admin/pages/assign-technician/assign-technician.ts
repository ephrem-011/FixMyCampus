import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../../../features/tickets/services/ticket-api';

@Component({
  selector: 'app-assign-technician',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './assign-technician.scss',
  templateUrl: './assign-technician.html',
})
export class AssignTechnician implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly ticketApi = inject(TicketApi);

  readonly ticket = signal<Ticket | undefined>(undefined);
  readonly assigning = signal(false);

  readonly form = this.fb.nonNullable.group({
    technicianId: [12, [Validators.required, Validators.min(1)]],
    technicianName: ['Marcus Lee', [Validators.required]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketApi.getTicketById(id).subscribe((ticket) => this.ticket.set(ticket));
  }

  assign(): void {
    const ticket = this.ticket();

    if (!ticket) {
      return;
    }

    this.assigning.set(true);
    this.ticketApi
      .assignTicket(
        ticket.id,
        this.form.value.technicianId ?? 12,
        this.form.value.technicianName ?? 'Marcus Lee',
      )
      .subscribe({
        next: () => {
          this.assigning.set(false);
          this.router.navigateByUrl('/admin/tickets');
        },
        error: () => this.assigning.set(false),
      });
  }
}
