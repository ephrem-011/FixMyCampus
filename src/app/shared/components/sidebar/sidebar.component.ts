
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../../features/auth/services/auth-api.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',

})
export class SidebarComponent {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  isActive(route: string): boolean {
  return this.router.isActive(
    route,
    route === '/tickets'
      ? { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
      : { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
  );
}
  @Output() readonly navigate = new EventEmitter<void>();

  get user() {
    return this.authApi.getUser();
  }

  get role(): string {
    return this.user?.role ?? '';
  }

  get menuItems(): MenuItem[] {
    if (this.role === 'Admin') {
      return [
        { label: 'Dashboard', icon: '▦', route: '/admin/tickets' },
        { label: 'All Tickets', icon: '▤', route: '/admin/tickets' },
        { label: 'Assign Technician', icon: '↗', route: '/admin/assign' },
        { label: 'Campus Feed', icon: '◎', route: '/tickets' },
        { label: 'Report an Issue', icon: '+', route: '/tickets/report' },
      ];
    }

    if (this.role === 'Technician') {
      return [
        { label: 'Campus Feed', icon: '◎', route: '/tickets' },
        { label: 'My Assigned Tickets', icon: '▤', route: '/technician' },
      ];
    }

    return [
      { label: 'Campus Feed', icon: '◎', route: '/tickets' },
      { label: 'Report an Issue', icon: '+', route: '/tickets/report' },
      { label: 'My Tickets', icon: '▤', route: '/tickets/my' },
    ];
  }

  logout(): void {
    this.authApi.logout();
    this.router.navigate(['/auth/login']);
  }

  closeMenu(): void {
    this.navigate.emit();
  }
}
