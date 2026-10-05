import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.routes').then(
        (m) => m.TICKETS_ROUTES
      ),
  },
];