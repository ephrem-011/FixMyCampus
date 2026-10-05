import { Routes } from '@angular/router';

export const TICKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/campus-feed/campus-feed').then(
        (m) => m.CampusFeed
      ),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./pages/report-issue/report-issue').then(
        (m) => m.ReportIssue
      ),
  },
  {
    path: 'my',
    loadComponent: () =>
      import('./pages/my-tickets/my-tickets').then(
        (m) => m.MyTickets
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/ticket-details/ticket-details').then(
        (m) => m.TicketDetails
      ),
  },
];
