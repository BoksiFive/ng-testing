import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { PriceComponent } from './price.component';
import { PriceService } from './price.service';
import { PriceSymbolPipe } from './price-symbol.pipe';
import { findEl, setSelectValue } from 'src/tests/helpers';

const EUR_RATE = 1; 
const USD_RATE = 2;
const GBP_RATE = 3;

const EXCHANGE_RATES = [
  {
    rate: EUR_RATE,
    label: 'EUR',
  },
  {
    rate: USD_RATE,
    label: 'USD',
  },
  {
    rate: GBP_RATE,
    label: 'GBP',
  }
]

const PRICE = 7;
const COUNT = 2;

describe('PriceComponent', () => {
  let component: PriceComponent;
  let fixture: ComponentFixture<PriceComponent>;

  let fakePriceService: Pick<PriceService, keyof PriceService>;

  beforeEach(async () => {
    fakePriceService = {
      getExchangeRates: () => of(EXCHANGE_RATES),
    }

    await TestBed.configureTestingModule({
      declarations: [ PriceComponent, PriceSymbolPipe ],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: PriceService,
        useValue: fakePriceService,
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    component.price = PRICE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show initial price', () => {
    component.count = 0;
    fixture.detectChanges();

    const price = findEl(fixture, "price");
    expect(price.nativeElement.textContent).toEqual("Price: 0.00 €");
  });

  it('should select different currency', () => {
    setSelectValue(fixture, 'currency', "USD");
    fixture.detectChanges();
    expect(component.currency.value).toEqual("USD");
  });

  it('should update the price with correct price and currency', () => {
    component.count = COUNT;
    setSelectValue(fixture, 'currency', "USD");
    fixture.detectChanges();

    const price = findEl(fixture, 'price');
    expect(price.nativeElement.textContent).toEqual(`Price: ${(PRICE * COUNT * USD_RATE).toFixed(2)} $`);
  });
});