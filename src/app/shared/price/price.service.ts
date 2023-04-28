import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Currency = "EUR" | "USD" | "GBP";

export interface Rate {
  rate: number;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class PriceService {

  constructor() { }

  /* This should be collected from Exchange Rate API */
  getExchangeRates(): Observable<Rate[]> {
    return of([
      {
        rate: 1,
        label: 'EUR',
      },
      {
        rate: 1.1,
        label: 'USD',
      },
      {
        rate: 0.8,
        label: 'GBP',
      }
    ])
  }
}
