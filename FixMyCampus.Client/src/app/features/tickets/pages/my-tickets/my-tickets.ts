import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../services/ticket-api';
import { TicketCard } from '../../components/ticket-card/ticket-card';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink, TicketCard],
  styleUrl: './my-tickets.scss',
  templateUrl: './my-tickets.html',
})
export class MyTickets implements OnInit {
  private readonly ticketApi = inject(TicketApi);

  readonly tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.ticketApi.getTickets().subscribe((tickets) => this.tickets.set(tickets));
  }
}
