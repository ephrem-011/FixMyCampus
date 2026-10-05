import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-filters',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './ticket-filters.scss',
  templateUrl: './ticket-filters.html',
})
export class TicketFilters {
  @Output() statusChange = new EventEmitter<string>();

  readonly filters = ['All', 'New', 'Assigned', 'InProgress', 'Resolved'];
}
