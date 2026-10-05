import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';

type TicketStatus = 'New' | 'Assigned' | 'In Progress' | 'Resolved';

interface ReporterTicket {
  id: string;
  title: string;
  category: string;
  building: string;
  room: string;
  status: TicketStatus;
  createdAt: string;
}

@Component({
  selector: 'app-reporter-dashboard',
  imports: [RouterLink, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly userName = signal('Tame');

  readonly tickets = signal<ReporterTicket[]>([
    {
      id: 'TKT-001',
      title: 'Projector not working',
      category: 'Equipment',
      building: 'Science Building',
      room: 'R201',
      status: 'Assigned',
      createdAt: '2026-10-05',
    },
    {
      id: 'TKT-002',
      title: 'Wi-Fi connection problem',
      category: 'Network',
      building: 'Engineering Building',
      room: 'Lab 3',
      status: 'In Progress',
      createdAt: '2026-10-04',
    },
    {
      id: 'TKT-003',
      title: 'Leaking pipe',
      category: 'Plumbing',
      building: 'Administration Building',
      room: 'R102',
      status: 'Resolved',
      createdAt: '2026-10-02',
    },
    {
      id: 'TKT-004',
      title: 'Broken power outlet',
      category: 'Electrical',
      building: 'Library',
      room: 'R12',
      status: 'New',
      createdAt: '2026-10-01',
    },
  ]);

  readonly totalTickets = computed(() => this.tickets().length);

  readonly activeTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status !== 'Resolved').length,
  );

  readonly resolvedTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'Resolved').length,
  );

  readonly newTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'New').length,
  );

  readonly recentTickets = computed(() => this.tickets().slice(0, 4));
}
