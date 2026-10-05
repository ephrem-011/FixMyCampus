import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketHistory } from '../../../../Core/models/ticket.model';

@Component({
  selector: 'app-ticket-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-timeline.html',
  styleUrl: './ticket-timeline.scss',
})
export class TicketTimeline {
  @Input() history: TicketHistory[] = [];
}