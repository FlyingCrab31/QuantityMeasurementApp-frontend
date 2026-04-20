import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityService, UNIT_CATEGORIES, UnitCategory } from '../../services/quantity.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent {
  categories: UnitCategory[] = UNIT_CATEGORIES;
  selectedCategory: UnitCategory = this.categories[0];

  value1: number | null = null;
  unit1: string = this.selectedCategory.units[0];

  value2: number | null = null;
  unit2: string = this.selectedCategory.units[1];

  result: boolean | null = null;
  loading = false;
  error = '';
  showResult = false;

  constructor(
    private quantityService: QuantityService,
    private historyService: HistoryService
  ) {}

  onCategoryChange(): void {
    this.unit1 = this.selectedCategory.units[0];
    this.unit2 = this.selectedCategory.units[1];
    this.result = null;
    this.showResult = false;
    this.error = '';
  }

  compare(): void {
    if (this.value1 === null || this.value2 === null) {
      this.error = 'Please enter both values';
      return;
    }

    this.loading = true;
    this.error = '';
    this.showResult = false;

    this.quantityService.compare(
      { value: this.value1, unit: this.unit1 },
      { value: this.value2, unit: this.unit2 }
    ).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
        
        // Log to history
        this.historyService.addRecord({
          type: 'Compare',
          details: `${this.value1} ${this.formatUnit(this.unit1)} ${res ? '==' : '!='} ${this.value2} ${this.formatUnit(this.unit2)}`
        });

        setTimeout(() => this.showResult = true, 50);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Comparison failed. Ensure units are of the same type.';
      }
    });
  }

  formatUnit(unit: string): string {
    return unit.charAt(0) + unit.slice(1).toLowerCase();
  }
}
