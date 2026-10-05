import { Ticket } from '../../../core/models/ticket.model';
import { filterAndSortTickets } from './ticket-list';

const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Broken projector',
    category: 'Equipment',
    room: 'A-101',
    description: '',
    status: 'Assigned',
    priority: 'High',
    buildingId: 1,
    buildingName: 'Science Hall',
    reporterId: 10,
    reporterName: 'Ava Reed',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    history: [],
  },
  {
    id: 2,
    title: 'Leaking sink',
    category: 'Plumbing',
    room: 'B-202',
    description: '',
    status: 'Resolved',
    priority: 'Low',
    buildingId: 2,
    buildingName: 'Library',
    reporterId: 11,
    reporterName: 'Noah Chen',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    history: [],
  },
];

describe('filterAndSortTickets', () => {
  it('searches ticket details and reporter names case-insensitively', () => {
    const result = filterAndSortTickets(tickets, {
      searchTerm: 'AVA',
      status: 'All',
      priority: 'All',
      sort: 'newest',
    });

    expect(result.map((ticket) => ticket.id)).toEqual([1]);
  });

  it('applies status and priority filters together', () => {
    const result = filterAndSortTickets(tickets, {
      searchTerm: '',
      status: 'Assigned',
      priority: 'High',
      sort: 'newest',
    });

    expect(result.map((ticket) => ticket.id)).toEqual([1]);
  });

  it('sorts newest tickets first by default', () => {
    const result = filterAndSortTickets(tickets, {
      searchTerm: '',
      status: 'All',
      priority: 'All',
      sort: 'newest',
    });

    expect(result.map((ticket) => ticket.id)).toEqual([2, 1]);
  });
});
