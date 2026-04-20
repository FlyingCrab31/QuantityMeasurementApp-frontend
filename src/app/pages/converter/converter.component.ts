import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityService, UNIT_CATEGORIES, UnitCategory } from '../../services/quantity.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
  categories: UnitCategory[] = UNIT_CATEGORIES;
  selectedCategory: UnitCategory = this.categories[0];

  sourceValue: number | null = null;
  sourceUnit: string = this.selectedCategory.units[0];
  targetUnit: string = this.selectedCategory.units[1];

  result: { value: number; unit: string } | null = null;
  loading = false;
  error = '';
  showResult = false;

  constructor(
    private quantityService: QuantityService,
    private historyService: HistoryService
  ) {}

  onCategoryChange(): void {
    this.sourceUnit = this.selectedCategory.units[0];
    this.targetUnit = this.selectedCategory.units[1];
    this.result = null;
    this.showResult = false;
    this.error = '';
  }

  swapUnits(): void {
    const temp = this.sourceUnit;
    this.sourceUnit = this.targetUnit;
    this.targetUnit = temp;
    this.result = null;
    this.showResult = false;
  }

  convert(): void {
    if (this.sourceValue === null || this.sourceValue === undefined) {
      this.error = 'Please enter a value';
      return;
    }

    this.loading = true;
    this.error = '';
    this.showResult = false;

    this.quantityService.convert(
      { value: this.sourceValue, unit: this.sourceUnit },
      this.targetUnit
    ).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
        
        // Log to history
        this.historyService.addRecord({
          type: 'Convert',
          details: `${this.sourceValue} ${this.formatUnit(this.sourceUnit)} = ${res.value} ${this.formatUnit(res.unit)}`
        });

        setTimeout(() => this.showResult = true, 50);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Conversion failed. Make sure units are compatible.';
      }
    });
  }

  formatUnit(unit: string): string {
    return unit.charAt(0) + unit.slice(1).toLowerCase();
  }
}
