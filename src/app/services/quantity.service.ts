import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuantityDTO {
  value: number;
  unit: string;
}

export interface UnitCategory {
  name: string;
  icon: string;
  units: string[];
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    icon: '📏',
    units: ['FEET', 'INCH', 'YARDS', 'CENTIMETERS']
  },
  {
    name: 'Weight',
    icon: '⚖️',
    units: ['KILOGRAM', 'GRAM', 'POUND']
  },
  {
    name: 'Volume',
    icon: '🧪',
    units: ['LITRE', 'MILLILITRE', 'GALLON']
  },
  {
    name: 'Temperature',
    icon: '🌡️',
    units: ['CELSIUS', 'FAHRENHEIT', 'KELVIN']
  }
];

@Injectable({ providedIn: 'root' })
export class QuantityService {
  private readonly API = 'http://localhost:8080/quantity';

  constructor(private http: HttpClient) {}

  convert(quantity: QuantityDTO, targetUnit: string): Observable<QuantityDTO> {
    const params = new HttpParams().set('targetUnit', targetUnit);
    return this.http.post<QuantityDTO>(`${this.API}/convert`, quantity, { params });
  }

  compare(q1: QuantityDTO, q2: QuantityDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.API}/compare`, [q1, q2]);
  }

  add(q1: QuantityDTO, q2: QuantityDTO): Observable<QuantityDTO> {
    return this.http.post<QuantityDTO>(`${this.API}/add`, [q1, q2]);
  }

  getCategories(): UnitCategory[] {
    return UNIT_CATEGORIES;
  }

  getCategoryForUnit(unit: string): UnitCategory | undefined {
    return UNIT_CATEGORIES.find(c => c.units.includes(unit));
  }

  isTemperatureUnit(unit: string): boolean {
    return UNIT_CATEGORIES.find(c => c.name === 'Temperature')?.units.includes(unit) ?? false;
  }
}
