# **Angular Testing** 🧪 

## **Creating a test suite** 📝 

Describe is a function that takes two parameters. A string with a human-readable name and a function containing the suite definition.

```ts
describe('Suite description', () => {
  /* … */
});
```

Describe blocks can be nested to structure big suites and divide them into logical sections.

```ts
describe('Suite description', () => {
  describe('One aspect', () => {
    /* … */
  });
  describe('Another aspect', () => {
    /* … */
  });
});
```

---
<p>&nbsp;</p>

## **Specifications** 📝 
It is a function that takes two parameters. The first parameter is a string with a human-readable description. The second parameter is a function containing the spec code.

```ts
describe('Suite description', () => {
  it('Spec description', () => {
    /* … */
  });
  /* … more specs …  */
});
```
The pronoun it refers to the code under test. it should be the subject of a human-readable sentence that asserts the behavior of the code under test.
```ts
it('increments the count', () => {
  /* … */
});
it('resets the count', () => {
  /* … */
});
```

---
<p>&nbsp;</p>

## **Structure of the test**
Irrespective of the testing framework, the testing code typically consists of three phases: Arrange, Act and Assert.

- Arrange is the preparation and setup phase. For example, the class under test is instantiated. Dependencies are set up. Spies and fakes are created.
- Act is the phase where interaction with the code under test happens. For example, a method is called or an HTML element in the DOM is clicked.
- Assert is the phase where the code behavior is checked and verified. For example, the actual output is compared to the expected output.

## **Expectations** ✅
```ts
const expectedValue = 5;
const actualValue = add(2, 3);
expect(actualValue).toBe(expectedValue);
```
### **Matchers**
**toBe** is useful to compare primitive values like strings, numbers and booleans. For objects, toBe matches only if the actual and the expected value are the very same object.

**toEqual** is useful for checking the deep equality of two objects.

```ts
// Fails, the two objects are not identical
expect({ name: 'John' }).toBe({ name: 'John' });

// Passes, the two objects are not identical but deeply equal
expect({ name: 'John' }).toEqual({ name: 'John' });
```

**Custom matcher**
```ts
export const CustomMatcher: CustomMatcherFactories = {
  isEqual: function (): CustomMatcher {
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

...

beforeEach(() => {
  jasmine.addMatchers(IsMatcher)
});
```

---
<p>&nbsp;</p>

## **Repetitive setup** 🔁
Setup that is repeated over and over, so it should be defined once in a central place. 
You could write a setup function and call it at the beginning of each spec. 
Using Jasmine, you can declare code that is called before and after each spec, or before and after all specs.
For this purpose, Jasmine provides four functions: **beforeEach**, **afterEach**, **beforeAll** and **afterAll**. 
They are called inside of a describe block, just like it. They expect one parameter, a function that is called at the given stages.

```ts 
describe('Suite description', () => {
  beforeAll(() => {
    console.log('Called before all specs are run');
  });
  afterAll(() => {
    console.log('Called after all specs are run');
  });

  beforeEach(() => {
    console.log('Called before each spec is run');
  });
  afterEach(() => {
    console.log('Called after each spec is run');
  });

  it('Spec 1', () => {
    console.log('Spec 1');
  });
  it('Spec 2', () => {
    console.log('Spec 2');
  });
});
```

---
<p>&nbsp;</p>

## **Faking/Mocking dependencies, Spies** 🕵️
A fake implementation must have the **same shape** of the original. If the dependency is a function, the fake
must have the **same signature**, meaning the same parameters and the same return value. If the dependency is an 
object, the fake must have the **same public API**, meaning the same public methods and properties.
The fake does **not need to be complete**, but sufficient enough to act as a replacement. 
The fake needs to be equivalent to the original as far as the code under test is concerned, **not fully equal to the original**.

### **Creating a spy**
```ts
const fetchSpy = jasmine.createSpy('fetch').and.returnValue(new Response(/* … */));
...
// Using spy in assert
expect(fetchSpy).toHaveBeenCalledWith('/todos');
```

### **Spying on existing methods**
```ts
spyOn(window, 'fetch').and.returnValue(new Response(/* … */));
...
// Using spy in assert
expect(window.fetch).toHaveBeenCalledWith('/todos');
```

---
<p>&nbsp;</p>

## **Debugging tests** 🔬

### **Test focus**
When locating an error, narrow down the scope gradually: Execute only one test, one suite, one spec, one expectation.
Per default, Karma and Jasmine compile and run all specs again with every code change.
The easiest way to narrow down the scope is to set a *focus* on a suite or spec. 

**Focus on suite**
```ts
fdescribe('Example spec', () => {
  it('one spec', () => { /* … */ });
  it('another spec', () => { /* … */ });
});
```

**Focus on spec**
```ts
describe('Example spec', () => {
  fit('one spec', () => { /* … */ }); // use 
  it('another spec', () => { /* … */ });
});
```

### **Run test only for the file you are currently working on**
```bash
ng test --include **/app.component.spec.ts
# all files called app.component.spec.ts in any subdirectory
```

### **Other methods for debugging** 
- console.log
- debugger