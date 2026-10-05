import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../../../features/tickets/services/ticket-api';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './tickets.scss',
  templateUrl: './tickets.html',
})
export class Tickets implements OnInit {
  private readonly ticketApi = inject(TicketApi);

  readonly tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.ticketApi.getTickets().subscribe((tickets) => this.tickets.set(tickets));
  }
}
