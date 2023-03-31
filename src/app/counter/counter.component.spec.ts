import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment the count', () => {
    const { debugElement } = fixture;
    // Arrange: get reference to button
    const incrementButton = debugElement.query(By.css('[data-testid="increment-button"]'));

    // Act: Click on the increment button
    incrementButton.triggerEventHandler('click', null);
    // Rerender component
    fixture.detectChanges();

    // Assert: Expect that the displayed count now reads “1”.
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe('1');
  })

  it('decrements the count', () => {
    const { debugElement } = fixture;
    // Arrange: get reference to button
    const decrementButton = debugElement.query(By.css('[data-testid="decrement-button"]'));

    // Act: Click on the increment button
    decrementButton.triggerEventHandler('click', null);
    // Rerender component
    fixture.detectChanges();
  
    // Assert: Expect that the displayed count now reads “-1”.
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe('-1');
  });
});
