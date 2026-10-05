import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../../../features/tickets/services/ticket-api';
import { AuthApi } from '../../../auth/services/auth-api';

@Component({
  selector: 'app-assigned-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './assigned-tickets.scss',
  templateUrl: './assigned-tickets.html',
})
export class AssignedTickets implements OnInit {
  private readonly ticketApi = inject(TicketApi);
  private readonly authApi = inject(AuthApi);

  readonly tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    const userId = this.authApi.session?.userId;
    this.ticketApi
      .getTickets()
      .subscribe((tickets) =>
        this.tickets.set(tickets.filter((ticket) => ticket.technicianId === userId)),
      );
  }
}
