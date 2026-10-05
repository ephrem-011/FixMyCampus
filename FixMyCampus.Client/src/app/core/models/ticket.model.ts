export type TicketStatus = 'New' | 'Assigned' | 'InProgress' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface TicketHistoryEntry {
  id: number;
  ticketId: number;
  fromStatus: TicketStatus;
  toStatus: TicketStatus;
  note: string;
  actor: string;
  changedAt: string;
}

export interface Ticket {
  id: number;
  title: string;
  category: string;
  room: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  buildingId: number;
  buildingName: string;
  reporterId: number;
  reporterName: string;
  technicianId?: number | null;
  technicianName?: string;
  createdAt: string;
  updatedAt: string;
  history: TicketHistoryEntry[];
}
