import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Ticket, TicketPriority, TicketStatus } from '../../../../core/models/ticket.model';
import { TicketApi } from '../../services/ticket-api';
import { TicketCard } from '../../components/ticket-card/ticket-card';
import {
  TicketListPriorityFilter,
  TicketListSort,
  TicketListStatusFilter,
  filterAndSortTickets,
} from '../../utils/ticket-list';

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
  readonly searchTerm = signal('');
  readonly statusFilter = signal<TicketListStatusFilter>('All');
  readonly priorityFilter = signal<TicketListPriorityFilter>('All');
  readonly sortOrder = signal<TicketListSort>('newest');
  readonly filteredTickets = computed(() =>
    filterAndSortTickets(this.tickets(), {
      searchTerm: this.searchTerm(),
      status: this.statusFilter(),
      priority: this.priorityFilter(),
      sort: this.sortOrder(),
    }),
  );
  readonly statuses: TicketStatus[] = ['New', 'Assigned', 'InProgress', 'Resolved'];
  readonly priorities: TicketPriority[] = ['Low', 'Medium', 'High'];
  readonly sortOptions: { value: TicketListSort; label: string }[] = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title-asc', label: 'Title A–Z' },
    { value: 'title-desc', label: 'Title Z–A' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority (high to low)' },
  ];

  ngOnInit(): void {
    this.ticketApi.getMyTickets().subscribe((tickets) => this.tickets.set(tickets));
  }

  updateSearch(event: Event): void {
    const input = event.currentTarget;
    if (input instanceof HTMLInputElement) {
      this.searchTerm.set(input.value);
    }
  }

  updateStatusFilter(event: Event): void {
    const select = event.currentTarget;
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    const value = select.value;
    if (value === 'All' || this.statuses.includes(value as TicketStatus)) {
      this.statusFilter.set(value as TicketListStatusFilter);
    }
  }

  updatePriorityFilter(event: Event): void {
    const select = event.currentTarget;
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    const value = select.value;
    if (value === 'All' || this.priorities.includes(value as TicketPriority)) {
      this.priorityFilter.set(value as TicketListPriorityFilter);
    }
  }

  updateSortOrder(event: Event): void {
    const select = event.currentTarget;
    if (
      select instanceof HTMLSelectElement &&
      this.sortOptions.some((item) => item.value === select.value)
    ) {
      this.sortOrder.set(select.value as TicketListSort);
    }
  }
}
