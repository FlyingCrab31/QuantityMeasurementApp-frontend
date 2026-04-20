import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface HistoryItem {
  id: string;
  type: 'Convert' | 'Compare' | 'Add';
  timestamp: Date;
  details: string;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private readonly BASE_KEY = 'qma_history';

  constructor(private authService: AuthService) {}

  private getStorageKey(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${this.BASE_KEY}_${user.email}` : this.BASE_KEY;
  }

  getHistory(): HistoryItem[] {
    const key = this.getStorageKey();
    const data = localStorage.getItem(key);
    if (!data) return [];
    try {
      const items = JSON.parse(data);
      return items.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    } catch (e) {
      return [];
    }
  }

  addRecord(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
    const current = this.getHistory();
    const newRecord: HistoryItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      timestamp: new Date()
    };
    current.unshift(newRecord);
    localStorage.setItem(this.getStorageKey(), JSON.stringify(current));
  }

  clearHistory(): void {
    localStorage.removeItem(this.getStorageKey());
  }
}
