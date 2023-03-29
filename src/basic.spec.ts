/// <reference path="./../test.d.ts"/>
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const IsMatcher: CustomMatcherFactories = {
  is: function (): CustomMatcher {
      return {
          compare: function <T>(actual: T, expected: T): CustomMatcherResult {

              const passes = Object.is(actual, expected);

              return {
                  pass: passes,
                  message: passes ? undefined: `${actual} is not equal to ${expected}`,
              }
          }
      }
  }
};

export function add(x: number, y: number): number {
  return x + y;
}

describe("Add", () => {
  it("2 + 3 should be 5", () => {
    expect(add(2, 3)).toBe(5);
  })

  it("3 + 3 should be 6", () => {
    expect(add(3, 3)).toBe(6);
  })
});


describe("Add using custom matcher", () => {
  beforeEach(() => {
    jasmine.addMatchers(IsMatcher)
  });

  it("2 + 3 should be 5", () => {
    expect(add(2, 3)).is(5)
  })

  it("3 + 3 should be 6", () => {
    expect(add(3, 3)).is(6);
  })
});