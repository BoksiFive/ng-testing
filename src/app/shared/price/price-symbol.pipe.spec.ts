import { DEFAULT_PRICE_SYMBOL, PriceSymbolPipe } from './price-symbol.pipe';

describe('PriceSymbolPipe', () => {
  let pipe: PriceSymbolPipe;

  beforeEach(() => {
    pipe = new PriceSymbolPipe(DEFAULT_PRICE_SYMBOL)
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display correct symbol for currency', () => {
    expect(pipe.transform("EUR")).toBe(DEFAULT_PRICE_SYMBOL["EUR"]);
    expect(pipe.transform("USD")).toBe(DEFAULT_PRICE_SYMBOL["USD"]);
    expect(pipe.transform("GBP")).toBe(DEFAULT_PRICE_SYMBOL["GBP"]);
  });
})
