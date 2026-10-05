import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketApiService } from '../../services/ticket-api.service';
import { Ticket } from '../../../../Core/models/ticket.model';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tickets.html',
  styleUrl: './my-tickets.scss',
})
export class MyTickets implements OnInit {
  private readonly ticketApi = inject(TicketApiService);
  private readonly router = inject(Router);

  tickets: Ticket[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.errorMessage = '';

    this.ticketApi.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage =
          'Unable to load your tickets. Please try again.';
      },
    });
  }

  openTicket(ticket: Ticket): void {
    this.router.navigate(['/tickets', ticket.id]);
  }

  reportIssue(): void {
    this.router.navigate(['/tickets/report']);
  }
}