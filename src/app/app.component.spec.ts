import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CounterModule } from './shared/counter/counter.module';
import { PriceModule } from './shared/price/price.module';
import { findComponent } from 'src/tests/helpers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      // imports: [CounterModule, PriceModule]
      schemas: [NO_ERRORS_SCHEMA] // TODO: remove later
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('should render a price', () => {
    const price = findComponent(fixture, 'app-price');
    expect(price).toBeTruthy();
  });

  it('should pass start count to a counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties["startCount"]).toBe(0);
  });

  it('should pass count to a price', () => {
    const price = findComponent(fixture, 'app-price');
    expect(price.properties["count"]).toBe(0);
  });

  it('should listen for count changes', () => {
    const countChangeSpy = spyOn(component, "onCountChange");
    const counter = findComponent(fixture, 'app-counter');
    const count = 5;
    counter.triggerEventHandler('countChange', count);

    expect(countChangeSpy).toHaveBeenCalled();
  });

  it('should update count of the price once it is changed', () => {
    const counter = findComponent(fixture, 'app-counter');
    const price = findComponent(fixture, 'app-price');
    const count = 5;
    counter.triggerEventHandler('countChange', count);

    fixture.detectChanges();

    expect(price.properties["count"]).toBe(5);
  });
});
