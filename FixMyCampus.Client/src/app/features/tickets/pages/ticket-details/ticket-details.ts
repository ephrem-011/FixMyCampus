import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../services/ticket-api';
import { TicketTimeline } from '../../components/ticket-timeline/ticket-timeline';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, TicketTimeline],
  styleUrl: './ticket-details.scss',
  templateUrl: './ticket-details.html',
})
export class TicketDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly ticketApi = inject(TicketApi);

  readonly ticket = signal<Ticket | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketApi.getTicketById(id).subscribe((ticket) => this.ticket.set(ticket));
  }
}
