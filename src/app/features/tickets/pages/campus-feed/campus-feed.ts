import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketApiService } from '../../services/ticket-api.service';
import { Ticket, TicketStatus } from '../../../../Core/models/ticket.model';

@Component({
  selector: 'app-campus-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campus-feed.html',
  styleUrl: './campus-feed.scss',
})
export class CampusFeed implements OnInit {
  private readonly ticketApi = inject(TicketApiService);
  private readonly router = inject(Router);

  tickets: Ticket[] = [];
  loading = false;
  errorMessage = '';

  selectedBuilding = '';
  selectedStatus = '';

  readonly buildings = [
    'Engineering Building',
    'Main Building',
    'Library',
    'Science Building',
    'Administration Building',
  ];

  readonly statuses: TicketStatus[] = [
    'New',
    'Assigned',
    'In Progress',
    'Resolved',
  ];

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.errorMessage = '';

    this.ticketApi
      .getTickets(this.selectedBuilding, this.selectedStatus)
      .subscribe({
        next: (tickets) => {
          this.tickets = tickets;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMessage =
            'Unable to load campus issues. Please try again.';
        },
      });
  }

  applyFilters(): void {
    this.loadTickets();
  }

  clearFilters(): void {
    this.selectedBuilding = '';
    this.selectedStatus = '';
    this.loadTickets();
  }

  openTicket(ticket: Ticket): void {
    this.router.navigate(['/tickets', ticket.id]);
  }

  reportIssue(): void {
    this.router.navigate(['/tickets/report']);
  }
}