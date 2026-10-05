import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../../../features/tickets/services/ticket-api';

@Component({
  selector: 'app-resolve-ticket',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './resolve-ticket.scss',
  templateUrl: './resolve-ticket.html',
})
export class ResolveTicket implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketApi = inject(TicketApi);

  readonly ticket = signal<Ticket | undefined>(undefined);
  readonly resolving = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketApi.getTicketById(id).subscribe((ticket) => this.ticket.set(ticket));
  }

  resolve(): void {
    const ticket = this.ticket();

    if (!ticket) {
      return;
    }

    this.resolving.set(true);
    const nextStatus = ticket.status === 'Assigned' ? 'InProgress' : 'Resolved';
    this.ticketApi.updateTicketStatus(ticket.id, nextStatus).subscribe({
      next: () => {
        this.resolving.set(false);
        if (nextStatus === 'InProgress') {
          this.ticket.update((current) =>
            current ? { ...current, status: 'InProgress' } : current,
          );
        } else {
          this.router.navigateByUrl('/technician/assigned');
        }
      },
      error: () => this.resolving.set(false),
    });
  }
}
