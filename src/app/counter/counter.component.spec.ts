import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, findEl, queryByCss, setInputValue } from 'src/tests/helpers';

import { CounterComponent } from './counter.component';

const startCount = 10;

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
    component.startCount = startCount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    const count = findEl(fixture, "count");
    expect(count.nativeElement.textContent).toEqual(String(startCount));
  });

  it('should increment the count', () => {
    click(fixture, 'increment-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(11));
  })

  it('should decrement the count', () => {
    click(fixture, 'decrement-button');
    fixture.detectChanges();
    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(String(9));
  });

  it('should reset the count', () => {    
    const newCount = "123";
    setInputValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    const count = findEl(fixture, 'count');
    expect(count.nativeElement.textContent).toEqual(newCount);
  });

  it('emit changes event on increment', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    click(fixture, "increment-button");

    expect(changesSpy).toHaveBeenCalledWith(11);
  });

  it('emit changes event on decrement', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    click(fixture, "decrement-button");
    expect(changesSpy).toHaveBeenCalledWith(9);
  });

  it('emit changes event on reset', () => {    
    const changesSpy = spyOn(component.countChange, "emit");
    setInputValue(fixture, 'reset-input', "123")
    click(fixture, "reset-button");

    expect(changesSpy).toHaveBeenCalledWith(123);
  });
});

