import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(
        (m) => m.AUTH_ROUTES
      ),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.routes').then(
        (m) => m.TICKETS_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
