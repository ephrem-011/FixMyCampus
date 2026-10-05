import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

import { Ticket, TicketStatus } from '../../../core/models/ticket.model';

export interface TicketCreateRequest {
  category: string;
  room: string;
  description: string;
  buildingId: number;
}

export interface TicketBuilding {
  id: number;
  name: string;
}

export interface TicketTechnician {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface TicketDto extends Omit<Ticket, 'title' | 'priority' | 'history' | 'status'> {
  status: TicketStatus | number;
  history: Array<{
    id: number;
    fromStatus: TicketStatus | number;
    toStatus: TicketStatus | number;
    changedById: number;
    changedByName: string;
    changedAt: string;
  }>;
}

@Injectable({ providedIn: 'root' })
export class TicketApi {
  private readonly apiUrl = '/api/Tickets';

  constructor(private readonly http: HttpClient) {}

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
    return this.http
      .get<TicketDto[]>(this.apiUrl)
      .pipe(map((tickets) => tickets.map((ticket) => this.mapTicket(ticket))));
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http
      .get<TicketDto>(`${this.apiUrl}/${id}`)
      .pipe(map((ticket) => this.mapTicket(ticket)));
  }

  getMyTickets(): Observable<Ticket[]> {
    return this.http
      .get<TicketDto[]>(`${this.apiUrl}/my`)
      .pipe(map((tickets) => tickets.map((ticket) => this.mapTicket(ticket))));
  }

  getBuildings(): Observable<TicketBuilding[]> {
    return this.http.get<TicketBuilding[]>(`${this.apiUrl}/buildings`);
  }

  getTechnicians(): Observable<TicketTechnician[]> {
    return this.http.get<TicketTechnician[]>(`${this.apiUrl}/technicians`);
  }

  createTicket(request: TicketCreateRequest): Observable<Ticket> {
    return this.http
      .post<TicketDto>(this.apiUrl, request)
      .pipe(map((ticket) => this.mapTicket(ticket)));
  }

  assignTicket(ticketId: number, technicianId: number, technicianName: string): Observable<Ticket> {
    void technicianName;
    return this.http
      .put(`${this.apiUrl}/${ticketId}/assign`, { technicianId })
      .pipe(switchMap(() => this.getTicketById(ticketId)));
  }

  updateTicketStatus(ticketId: number, status: TicketStatus): Observable<Ticket> {
    const statusValue: Record<TicketStatus, number> = {
      New: 0,
      Assigned: 1,
      InProgress: 2,
      Resolved: 3,
    };
    return this.http
      .put(`${this.apiUrl}/${ticketId}/status`, { status: statusValue[status] })
      .pipe(switchMap(() => this.getTicketById(ticketId)));
  }

  private mapTicket(dto: TicketDto): Ticket {
    const statusNames: TicketStatus[] = ['New', 'Assigned', 'InProgress', 'Resolved'];
    const toStatus = (status: TicketStatus | number): TicketStatus =>
      typeof status === 'number' ? (statusNames[status] ?? 'New') : status;

    return {
      ...dto,
      title: dto.category,
      priority: 'Medium',
      status: toStatus(dto.status),
      history: dto.history.map((entry) => {
        const fromStatus = toStatus(entry.fromStatus);
        const currentStatus = toStatus(entry.toStatus);
        return {
          id: entry.id,
          ticketId: dto.id,
          fromStatus,
          toStatus: currentStatus,
          note: `${fromStatus} to ${currentStatus}`,
          actor: entry.changedByName,
          changedAt: entry.changedAt,
        };
      }),
    };
  }
}
