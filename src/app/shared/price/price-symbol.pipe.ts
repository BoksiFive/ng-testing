import { Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { Currency } from './price.service';

export const DEFAULT_PRICE_SYMBOL = {
  'EUR': "€",
  'USD': "$",
  'GBP': "£"
}

export const PRICE_SYMBOL = new InjectionToken<Record<Currency, string>>("PRICE_SYMBOL", {
  factory: () => DEFAULT_PRICE_SYMBOL
})

@Pipe({
  name: 'priceSymbol'
})
export class PriceSymbolPipe implements PipeTransform {

  constructor(@Inject(PRICE_SYMBOL) private priceSymbol: Record<string, string>) {}

  transform(value: Currency): string {
    return this.priceSymbol[value];
  }

}
