import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly userName = signal('User');
  readonly userRole = signal('Reporter');

  logout(): void {
    console.log('Logout');
  }
}
