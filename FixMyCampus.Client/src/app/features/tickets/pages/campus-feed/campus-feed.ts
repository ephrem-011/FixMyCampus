import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../services/ticket-api';
import { TicketCard } from '../../components/ticket-card/ticket-card';

@Component({
  selector: 'app-campus-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, TicketCard],
  styleUrl: './campus-feed.scss',
  templateUrl: './campus-feed.html',
})
export class CampusFeed implements OnInit {
  private readonly ticketApi = inject(TicketApi);

  readonly tickets = signal<Ticket[]>([]);

  ngOnInit(): void {
    this.ticketApi.getTickets().subscribe((tickets) => this.tickets.set(tickets));
  }
}
