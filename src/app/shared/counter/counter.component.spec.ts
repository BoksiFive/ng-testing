import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, findEl, setInputValue } from 'src/tests/helpers';

import { CounterComponent, clamp } from './counter.component';

const START_COUNT = 10;

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
    component.startCount = START_COUNT;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    const count = findEl(fixture, "count");
    expect(count.nativeElement.textContent).toEqual(String(START_COUNT));
  });

  it('should increment the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(START_COUNT+1));
  })

  it('should decrement the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(START_COUNT-1));
  });

  it('should reset the count', () => {    
    const newCount = "123";
    setInputValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(newCount);
  });

  it('should reset the count', () => {    
    const newCount = "123";
    setInputValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(newCount);
  });

  it('should reset the count to max value if the new count is greater then max', () => {    
    const newCount = "20";
    component.max = 10;
    setInputValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(10));
  });

  it('should reset the count to min value if the new count is less then min', () => {    
    const newCount = "-20";
    component.max = 0;
    setInputValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(0));
  });

  it('emit changes event on increment', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    click(fixture, "increment-button");

    expect(changesSpy).toHaveBeenCalledWith(START_COUNT+1);
  });

  it('emit changes event on decrement', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    click(fixture, "decrement-button");
    expect(changesSpy).toHaveBeenCalledWith(START_COUNT-1);
  });

  it('emit changes event on reset', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    setInputValue(fixture, 'reset-input', "123")
    click(fixture, "reset-button");

    expect(changesSpy).toHaveBeenCalledWith(123);
  });

  it('clamp the value between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(20, 0, 10)).toBe(10);
    expect(clamp(-2, 0, 10)).toBe(0);
  })
});

