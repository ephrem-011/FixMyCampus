import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TicketHistoryEntry } from '../../../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-timeline',
  standalone: true,
  imports: [CommonModule, DatePipe],
  styleUrl: './ticket-timeline.scss',
  templateUrl: './ticket-timeline.html',
})
export class TicketTimeline {
  @Input() history: TicketHistoryEntry[] = [];
}
