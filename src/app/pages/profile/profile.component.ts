import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UserResponse } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserResponse | null = null;
  editName = '';
  editing = false;
  saving = false;
  success = '';
  error = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.editName = this.user.name;
    }

    // Also refresh from API
    this.userService.getCurrentUser().subscribe({
      next: (u) => {
        this.user = u;
        this.editName = u.name;
        this.authService.updateCurrentUser(u);
      },
      error: () => {
        // fallback to stored user
      }
    });
  }

  startEdit(): void {
    this.editing = true;
    this.success = '';
    this.error = '';
  }

  cancelEdit(): void {
    this.editing = false;
    this.editName = this.user?.name || '';
    this.error = '';
  }

  saveProfile(): void {
    if (!this.editName.trim()) {
      this.error = 'Name cannot be empty';
      return;
    }

    this.saving = true;
    this.error = '';

    this.userService.updateCurrentUser(this.editName.trim()).subscribe({
      next: (u) => {
        this.user = u;
        this.authService.updateCurrentUser(u);
        this.editing = false;
        this.saving = false;
        this.success = 'Profile updated successfully!';
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Failed to update profile';
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatProvider(provider: string): string {
    return provider.charAt(0) + provider.slice(1).toLowerCase();
  }
}
