export type TicketStatus =
  | 'New'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved';

export type TicketUrgency = 'Low' | 'Medium' | 'High';

export interface TicketHistory {
  status: TicketStatus;
  changedAt: string;
  changedBy: string;
  note?: string;
}

export interface Ticket {
  id: string;
  category: string;
  building: string;
  room: string;
  description: string;
  urgency: TicketUrgency;
  status: TicketStatus;
  reporterName: string;
  assignedTechnician?: string;
  createdAt: string;
  updatedAt?: string;
  possibleDuplicateOfId?: string;
  similarityScore?: number;
  history?: TicketHistory[];
}