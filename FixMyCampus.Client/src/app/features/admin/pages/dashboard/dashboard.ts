import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type TicketStatus = 'New' | 'Assigned' | 'In Progress' | 'Resolved';

interface AdminTicket {
  id: string;
  title: string;
  category: string;
  building: string;
  room: string;
  status: TicketStatus;
  urgency: 'Low' | 'Medium' | 'High';
  reporterName: string;
  technicianName?: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly adminName = signal('Admin');

  readonly tickets = signal<AdminTicket[]>([
    {
      id: 'TKT-001',
      title: 'Projector not working',
      category: 'Equipment',
      building: 'Science Building',
      room: 'R201',
      status: 'Assigned',
      urgency: 'High',
      reporterName: 'Tame',
      technicianName: 'John Technician',
      createdAt: '2026-10-05',
    },
    {
      id: 'TKT-002',
      title: 'Wi-Fi connection problem',
      category: 'Network',
      building: 'Engineering Building',
      room: 'Lab 3',
      status: 'In Progress',
      urgency: 'Medium',
      reporterName: 'Sara',
      technicianName: 'Michael Technician',
      createdAt: '2026-10-04',
    },
    {
      id: 'TKT-003',
      title: 'Leaking pipe',
      category: 'Plumbing',
      building: 'Administration Building',
      room: 'R102',
      status: 'New',
      urgency: 'High',
      reporterName: 'Abel',
      createdAt: '2026-10-04',
    },
    {
      id: 'TKT-004',
      title: 'Broken power outlet',
      category: 'Electrical',
      building: 'Library',
      room: 'R12',
      status: 'New',
      urgency: 'Medium',
      reporterName: 'Hana',
      createdAt: '2026-10-03',
    },
    {
      id: 'TKT-005',
      title: 'Computer not starting',
      category: 'IT',
      building: 'Computer Science',
      room: 'Lab 2',
      status: 'Resolved',
      urgency: 'Low',
      reporterName: 'Daniel',
      technicianName: 'John Technician',
      createdAt: '2026-10-01',
    },
  ]);

  readonly totalTickets = computed(() => this.tickets().length);

  readonly openTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status !== 'Resolved').length,
  );

  readonly newTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'New').length,
  );

  readonly inProgressTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'In Progress').length,
  );

  readonly resolvedTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'Resolved').length,
  );

  readonly highUrgencyTickets = computed(
    () =>
      this.tickets().filter((ticket) => ticket.urgency === 'High' && ticket.status !== 'Resolved')
        .length,
  );

  readonly recentTickets = computed(() =>
    this.tickets()
      .filter((ticket) => ticket.status !== 'Resolved')
      .slice(0, 5),
  );

  readonly buildingCounts = computed(() => {
    const counts: Record<string, number> = {};

    for (const ticket of this.tickets()) {
      if (ticket.status !== 'Resolved') {
        counts[ticket.building] = (counts[ticket.building] ?? 0) + 1;
      }
    }

    return Object.entries(counts)
      .map(([building, count]) => ({
        building,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  });
}
