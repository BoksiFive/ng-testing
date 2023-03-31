import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {
  @Input() public startCount = 0;

  @Input() public max = Number.POSITIVE_INFINITY;

  @Input() public min = 0;

  @Output() public countChange = new EventEmitter<number>();

  protected count = 0;

  public ngOnChanges(changes: SimpleChanges): void {
    const startCount = changes["startCount"].currentValue;
    this.count = startCount;
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: number): void {
      this.count = newCount;
      this.notify();
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }
}
