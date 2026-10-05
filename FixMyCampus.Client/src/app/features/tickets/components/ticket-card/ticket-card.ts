import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Ticket } from '../../../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './ticket-card.scss',
  templateUrl: './ticket-card.html',
})
export class TicketCard {
  @Input() ticket!: Ticket;

  get statusClass(): string {
    return `status-${this.normalizeStatus(this.ticket.status)}`;
  }

  private normalizeStatus(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
}
