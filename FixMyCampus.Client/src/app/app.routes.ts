import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard';
import { RoleGuard } from './core/auth/role-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.LoginComponent),
  },

  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/pages/register/register').then((m) => m.Register),
  },

  {
    path: 'tickets',
    children: [
      {
        path: 'my',
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Reporter'] },
        loadComponent: () =>
          import('./features/tickets/pages/my-tickets/my-tickets').then((m) => m.MyTickets),
      },
      {
        path: 'feed',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/tickets/pages/campus-feed/campus-feed').then((m) => m.CampusFeed),
      },
      {
        path: 'report',
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Reporter'] },
        loadComponent: () =>
          import('./features/tickets/pages/report-issue/report-issue').then((m) => m.ReportIssue),
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/tickets/pages/ticket-details/ticket-details').then(
            (m) => m.TicketDetails,
          ),
      },
    ],
  },

  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: 'tickets',
        loadComponent: () =>
          import('./features/admin/pages/tickets/tickets').then((m) => m.Tickets),
      },
      {
        path: 'tickets/:id',
        loadComponent: () =>
          import('./features/admin/pages/ticket-details/ticket-details').then(
            (m) => m.TicketDetails,
          ),
      },
      {
        path: 'assign/:id',
        loadComponent: () =>
          import('./features/admin/pages/assign-technician/assign-technician').then(
            (m) => m.AssignTechnician,
          ),
      },
    ],
  },

  {
    path: 'technician',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Technician'] },
    children: [
      {
        path: 'assigned',
        loadComponent: () =>
          import('./features/technician/pages/assigned-tickets/assigned-tickets').then(
            (m) => m.AssignedTickets,
          ),
      },
      {
        path: 'ticket/:id',
        loadComponent: () =>
          import('./features/technician/pages/ticket-details/ticket-details').then(
            (m) => m.TicketDetails,
          ),
      },
      {
        path: 'resolve/:id',
        loadComponent: () =>
          import('./features/technician/pages/resolve-ticket/resolve-ticket').then(
            (m) => m.ResolveTicket,
          ),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
