import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type TicketStatus = 'Assigned' | 'In Progress' | 'Resolved';

interface TechnicianTicket {
  id: string;
  title: string;
  category: string;
  building: string;
  room: string;
  status: TicketStatus;
  urgency: 'Low' | 'Medium' | 'High';
  reporterName: string;
  createdAt: string;
}

@Component({
  selector: 'app-technician-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly technicianName = signal('John Technician');

  readonly tickets = signal<TechnicianTicket[]>([
    {
      id: 'TKT-001',
      title: 'Projector not working',
      category: 'Equipment',
      building: 'Science Building',
      room: 'R201',
      status: 'Assigned',
      urgency: 'High',
      reporterName: 'Tame',
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
      createdAt: '2026-10-04',
    },
    {
      id: 'TKT-003',
      title: 'Computer not starting',
      category: 'IT',
      building: 'Computer Science',
      room: 'Lab 2',
      status: 'Resolved',
      urgency: 'Low',
      reporterName: 'Daniel',
      createdAt: '2026-10-03',
    },
  ]);

  readonly assignedTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'Assigned').length,
  );

  readonly inProgressTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'In Progress').length,
  );

  readonly resolvedTickets = computed(
    () => this.tickets().filter((ticket) => ticket.status === 'Resolved').length,
  );

  readonly activeTickets = computed(() =>
    this.tickets().filter((ticket) => ticket.status !== 'Resolved'),
  );

  readonly highUrgencyTickets = computed(
    () =>
      this.tickets().filter((ticket) => ticket.urgency === 'High' && ticket.status !== 'Resolved')
        .length,
  );
}
