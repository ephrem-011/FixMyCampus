import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketApiService } from '../../services/ticket-api.service';
import { Ticket } from '../../../../Core/models/ticket.model';
import { TicketTimeline } from '../../components/ticket-timeline/ticket-timeline';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule, TicketTimeline],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.scss',
})
export class TicketDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketApi = inject(TicketApiService);

  ticket: Ticket | null = null;
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');

    if (!ticketId) {
      this.errorMessage = 'Ticket not found.';
      return;
    }

    this.loadTicket(ticketId);
  }

  loadTicket(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.ticketApi.getTicket(id).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage =
          'Unable to load this ticket. Please try again.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tickets']);
  }
}