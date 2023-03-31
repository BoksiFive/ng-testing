import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, findEl } from 'src/tests/helpers';

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
    click(fixture, 'increment-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual("1");
  })

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual("-1");
  });
});

