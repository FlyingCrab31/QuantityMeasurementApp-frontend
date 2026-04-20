import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HistoryService, HistoryItem } from '../../services/history.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  recentHistory: HistoryItem[] = [];

  constructor(
    public auth: AuthService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    const allHistory = this.historyService.getHistory();
    this.recentHistory = allHistory.slice(0, 3);
  }

  features = [
    {
      icon: '🔄',
      title: 'Convert',
      description: 'Transform quantities between different units of measurement instantly.',
      route: '/convert',
      gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(124, 58, 237, 0.05))',
      borderColor: 'rgba(124, 58, 237, 0.3)'
    },
    {
      icon: '⚖️',
      title: 'Compare',
      description: 'Check if two quantities are equivalent across different unit systems.',
      route: '/compare',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
      borderColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      icon: '➕',
      title: 'Add',
      description: 'Sum two quantities together, even when expressed in different units.',
      route: '/add',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    }
  ];

  unitCategories = [
    { icon: '📏', name: 'Length', units: 'Feet, Inch, Yards, Centimeters' },
    { icon: '⚖️', name: 'Weight', units: 'Kilogram, Gram, Pound' },
    { icon: '🧪', name: 'Volume', units: 'Litre, Millilitre, Gallon' },
    { icon: '🌡️', name: 'Temperature', units: 'Celsius, Fahrenheit, Kelvin' }
  ];
}
