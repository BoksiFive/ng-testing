import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function testIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`;
}

export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement {
  return queryByCss<T>(fixture, testIdSelector(testId));
}

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export function click<T>(
  fixture: ComponentFixture<T>,
  testId: string
): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

export function makeClickEvent(
  target: EventTarget
): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0
  };
}

export function setInputValue<T>(
  fixture: ComponentFixture<T>, 
  testId: string, 
  value: string
) {
  const element = findEl(fixture, testId);
  element.nativeElement.value = value;
  element.nativeElement.dispatchEvent(new Event("input"));
}

export function setSelectValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string,
): void {
  const element = findEl(fixture, testId);
  element.nativeElement.value = value;
  element.nativeElement.dispatchEvent(new Event("change"));
}