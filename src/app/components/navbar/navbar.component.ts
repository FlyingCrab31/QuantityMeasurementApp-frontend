import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  profileOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) this.profileOpen = false;
  }

  toggleProfile(): void {
    this.profileOpen = !this.profileOpen;
    if (this.profileOpen) this.menuOpen = false;
  }

  closeAll(): void {
    this.menuOpen = false;
    this.profileOpen = false;
  }

  logout(): void {
    this.closeAll();
    this.auth.logout();
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
