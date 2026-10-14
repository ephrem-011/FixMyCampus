import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthApiService } from '../../../features/auth/services/auth-api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authApi = inject(AuthApiService);

  @Output() readonly menuToggle = new EventEmitter<void>();

  get user() {
    return this.authApi.getUser();
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}