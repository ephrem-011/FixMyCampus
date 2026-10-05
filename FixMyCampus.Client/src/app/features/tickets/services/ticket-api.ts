import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs';

import { Ticket, TicketStatus } from '../../../core/models/ticket.model';

export interface TicketCreateRequest {
  title: string;
  category: string;
  room: string;
  description: string;
  buildingId: number;
  priority?: Ticket['priority'];
}

@Injectable({ providedIn: 'root' })
export class TicketApi {
  private readonly tickets: Ticket[] = [
    {
      id: 101,
      title: 'Broken classroom projector',
      category: 'AV Equipment',
      room: 'B-214',
      description: 'The projector in room B-214 powers on but shows a flickering display.',
      status: 'Assigned',
      priority: 'High',
      buildingId: 1,
      buildingName: 'Engineering Hall',
      reporterId: 7,
      reporterName: 'Ava Reed',
      technicianId: 12,
      technicianName: 'Marcus Lee',
      createdAt: '2026-10-01T08:45:00.000Z',
      updatedAt: '2026-10-01T09:15:00.000Z',
      history: [
        {
          id: 1,
          ticketId: 101,
          fromStatus: 'New',
          toStatus: 'Assigned',
          note: 'Assigned to maintenance technician.',
          actor: 'System',
          changedAt: '2026-10-01T09:00:00.000Z',
        },
      ],
    },
    {
      id: 102,
      title: 'Water leak near library entrance',
      category: 'Plumbing',
      room: 'L-001',
      description:
        'There is a slow water leak near the entrance mat and the floor is becoming slippery.',
      status: 'InProgress',
      priority: 'High',
      buildingId: 3,
      buildingName: 'Central Library',
      reporterId: 11,
      reporterName: 'Noah Chen',
      technicianId: 15,
      technicianName: 'Priya Singh',
      createdAt: '2026-10-02T12:00:00.000Z',
      updatedAt: '2026-10-02T13:20:00.000Z',
      history: [
        {
          id: 2,
          ticketId: 102,
          fromStatus: 'New',
          toStatus: 'Assigned',
          note: 'Ticket assigned for plumbing review.',
          actor: 'Admin',
          changedAt: '2026-10-02T12:10:00.000Z',
        },
        {
          id: 3,
          ticketId: 102,
          fromStatus: 'Assigned',
          toStatus: 'InProgress',
          note: 'Technician confirmed the source and initiated repair.',
          actor: 'Priya Singh',
          changedAt: '2026-10-02T13:20:00.000Z',
        },
      ],
    },
    {
      id: 103,
      title: 'Light out in the second-floor hallway',
      category: 'Electrical',
      room: 'S-214',
      description: 'One of the hallway fixtures near the student union stairs is out.',
      status: 'Resolved',
      priority: 'Medium',
      buildingId: 2,
      buildingName: 'Science Center',
      reporterId: 9,
      reporterName: 'Mila Turner',
      technicianId: 18,
      technicianName: 'Daniel Ortiz',
      createdAt: '2026-09-28T16:30:00.000Z',
      updatedAt: '2026-09-29T10:40:00.000Z',
      history: [
        {
          id: 4,
          ticketId: 103,
          fromStatus: 'New',
          toStatus: 'Assigned',
          note: 'Electrical team assigned to inspect fixture.',
          actor: 'Admin',
          changedAt: '2026-09-28T17:00:00.000Z',
        },
        {
          id: 5,
          ticketId: 103,
          fromStatus: 'Assigned',
          toStatus: 'Resolved',
          note: 'The ballast was replaced and the hallway light is working again.',
          actor: 'Daniel Ortiz',
          changedAt: '2026-09-29T10:40:00.000Z',
        },
      ],
    },
  ];

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets.map((ticket) => ({ ...ticket }))).pipe(delay(150));
  }

  getTicketById(id: number): Observable<Ticket | undefined> {
    return of(this.tickets.find((ticket) => ticket.id === id)).pipe(delay(100));
  }

  createTicket(request: TicketCreateRequest): Observable<Ticket> {
    const ticket: Ticket = {
      id: Date.now(),
      title: request.title,
      category: request.category,
      room: request.room,
      description: request.description,
      status: 'New',
      priority: request.priority ?? 'Medium',
      buildingId: request.buildingId,
      buildingName: 'Campus Building',
      reporterId: 99,
      reporterName: 'Current User',
      technicianId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: Date.now(),
          ticketId: Date.now(),
          fromStatus: 'New',
          toStatus: 'New',
          note: 'Ticket submitted by the reporter.',
          actor: 'Current User',
          changedAt: new Date().toISOString(),
        },
      ],
    };

    this.tickets.unshift(ticket);

    return of(ticket).pipe(delay(200));
  }

  assignTicket(ticketId: number, technicianId: number, technicianName: string): Observable<Ticket> {
    const ticket = this.tickets.find((entry) => entry.id === ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.technicianId = technicianId;
    ticket.technicianName = technicianName;
    ticket.status = 'Assigned';
    ticket.updatedAt = new Date().toISOString();
    ticket.history.unshift({
      id: Date.now(),
      ticketId,
      fromStatus: 'New',
      toStatus: 'Assigned',
      note: `Assigned to ${technicianName}.`,
      actor: 'Admin',
      changedAt: new Date().toISOString(),
    });

    return of({ ...ticket }).pipe(delay(150));
  }

  updateTicketStatus(ticketId: number, status: TicketStatus): Observable<Ticket> {
    const ticket = this.tickets.find((entry) => entry.id === ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const previousStatus = ticket.status;
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    ticket.history.unshift({
      id: Date.now(),
      ticketId,
      fromStatus: previousStatus,
      toStatus: status,
      note: `Status updated to ${status}.`,
      actor: 'System',
      changedAt: new Date().toISOString(),
    });

    return of({ ...ticket }).pipe(delay(150));
  }
}
