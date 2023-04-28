import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/* This should be tested separately from Counter component but for sake of simplicity is test as part of it. */
export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(min, n), max);
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  private _startCount = 0;
  @Input()
  public get startCount(): number {
    return this._startCount;
  }
  public set startCount(count: number) {
    this._startCount = count;
    this.count = count;
  }

  @Input() public max = Number.POSITIVE_INFINITY;

  @Input() public min = 0;

  @Output() public countChange = new EventEmitter<number>();

  protected count = 0;

  public increment(): void {
    this.count = clamp(++this.count, this.min, this.max);
    this.notify();
  }

  public decrement(): void {
    this.count = clamp(--this.count, this.min, this.max);
    this.notify();
  }

  public reset(newCount: number): void {
    this.count = clamp(newCount, this.min, this.max);
    this.notify();
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }
}
