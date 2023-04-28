import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Currency, PriceService, Rate } from './price.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  @Input() price: number = 0;

  private count$ = new BehaviorSubject(0);
  @Input() 
  set count(value: number) {
    this.count$.next(value);
  }

  currency = new FormControl<Currency>("EUR", { nonNullable: true });

  rate$ = this.currency.valueChanges.pipe(
    startWith(this.currency.value),
    switchMap((currency) => this.priceService.getExchangeRates().pipe(
      map((rates => rates.find(rate => rate.label === currency)))
    )),
    filter((rate): rate is Rate => Boolean(rate)),
    map(({ rate }) => rate)
  )

  price$ = combineLatest([this.count$, this.rate$]).pipe(
    map(([count, rate]) => (this.price * count * rate).toFixed(2))
  )
  
  constructor(private priceService: PriceService) {}
}
