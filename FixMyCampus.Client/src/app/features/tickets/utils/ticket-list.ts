import { Ticket, TicketPriority, TicketStatus } from '../../../core/models/ticket.model';

export type TicketListStatusFilter = TicketStatus | 'All';
export type TicketListPriorityFilter = TicketPriority | 'All';
export type TicketListSort =
  | 'newest'
  | 'oldest'
  | 'title-asc'
  | 'title-desc'
  | 'status'
  | 'priority';

export interface TicketListOptions {
  searchTerm: string;
  status: TicketListStatusFilter;
  priority: TicketListPriorityFilter;
  sort: TicketListSort;
}

const statusOrder: Record<TicketStatus, number> = {
  New: 0,
  Assigned: 1,
  InProgress: 2,
  Resolved: 3,
};

const priorityOrder: Record<TicketPriority, number> = {
  Low: 0,
  Medium: 1,
  High: 2,
};

export function filterAndSortTickets(tickets: Ticket[], options: TicketListOptions): Ticket[] {
  const query = options.searchTerm.trim().toLocaleLowerCase();

  return tickets
    .filter((ticket) => {
      if (options.status !== 'All' && ticket.status !== options.status) {
        return false;
      }

      if (options.priority !== 'All' && ticket.priority !== options.priority) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        ticket.title,
        ticket.category,
        ticket.room,
        ticket.buildingName,
        ticket.reporterName,
      ].some((value) => value.toLocaleLowerCase().includes(query));
    })
    .sort((left, right) => {
      switch (options.sort) {
        case 'oldest':
          return left.createdAt.localeCompare(right.createdAt);
        case 'title-asc':
          return left.title.localeCompare(right.title);
        case 'title-desc':
          return right.title.localeCompare(left.title);
        case 'status':
          return statusOrder[left.status] - statusOrder[right.status];
        case 'priority':
          return priorityOrder[right.priority] - priorityOrder[left.priority];
        case 'newest':
        default:
          return right.createdAt.localeCompare(left.createdAt);
      }
    });
}
