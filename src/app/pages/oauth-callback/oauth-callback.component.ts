import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  template: `
    <div class="callback-page">
      <div class="callback-card glass-card animate-scale-in">
        <div class="spinner"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .callback-card {
      padding: 40px 48px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .callback-card p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border-medium);
      border-top-color: var(--accent-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class OAuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const token = params['token'];
    const email = params['email'] || '';
    const name = params['name'] || '';
    const provider = params['provider'] || 'GOOGLE';

    if (token) {
      this.auth.handleOAuthCallback(token, email, name, provider);
      setTimeout(() => this.router.navigate(['/dashboard']), 500);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
