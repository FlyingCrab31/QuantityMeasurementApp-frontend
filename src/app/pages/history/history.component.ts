import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistoryService, HistoryItem } from '../../services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  historyItems: HistoryItem[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyItems = this.historyService.getHistory();
  }

  clearHistory(): void {
    this.historyService.clearHistory();
    this.historyItems = [];
  }
}
