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


---
<p>&nbsp;</p>

## Testing components

**Components**
- renders the template into the HTML DOM
- accepts data from parent (Inputs)
- emits data to parent (Output)
- reacts to users inputs
- renders ng-content and ng-templates
- uses routing information like the currently activated route
- talks to the services


**TestBed** 
creates and configures an Angular environment so you can test particular application parts like Components and Services. The TestBed comes with a testing Module that is configured like normal Modules in your application: You can declare Components, Directives and Pipes, provide Services and other Injectables as well as import other Modules.

```ts
TestBed.configureTestingModule({
  imports: [ /*… */ ],
  declarations: [MyComponent],
  providers: [ /*… */ ],
});
/* ... */

// Compile all declared Components, Directives and Pipes
TestBed.compileComponents();
```

## Rendering components
**createComponent** returns a ComponentFixture, essentially a wrapper around the Component with useful testing tools. createComponent renders the Component into a div container element in the HTML DOM.

```ts
const fixture = TestBed.createComponent(MyComponent);
```

In our testing environment, there is no automatic change detection.
Even with the default change detection strategy, a Component is not automatically rendered and re-rendered on updates.
In testing code, we have to **trigger the change detection manually**.
It allows us to test asynchronous behavior in a synchronous manner, which is much simpler.

```
fixture.detectChanges();
```

**TestBed and Jasmine**
```ts
describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;

  /* 
   Function is marked async because compileComponents is async operation.
   To compile the Components, Angular needs to fetch external the template files referenced by templateUrl. 
  */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
  });

  it('…', () => {
    /* … */
  });
});
```

[**Component fixture**](https://angular.io/api/core/testing/ComponentFixture)
In the context of Angular, the ComponentFixture holds the Component and provides a convenient interface to both the Component instance and the rendered DOM.The fixture references the Component instance via the componentInstance property.

```ts
const component = fixture.componentInstance;
```

[**Debug element**](https://angular.io/api/core/DebugElement)
For accessing elements in the DOM, Angular has another abstraction: The DebugElement wraps the native DOM element. The fixture’s debugElement property returns the Component’s host element.
The DebugElement offers handy properties like properties, attributes, classes and styles to examine the DOM element itself. The properties parent, children and childNodes help navigating in the DOM tree. They return DebugElements as well.

```ts
const { debugElement } = fixture;
```

**Querying the descendant elements
```ts
const { debugElement } = fixture;
// Find the first h1 element
const h1 = debugElement.query(By.css('h1'));
// Find all elements with the class .my-class
const debugElements = debugElement.queryAll(By.css('.my-class'));
```

Type and class selectors introduce a tight coupling between the test and the template. 
HTML elements are picked for semantic reasons. Classes are picked mostly for styling.
*Should the test fail if the element type or class has changed?*
Using [**data attributes**](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) in the test so we can use the corresponding attribute selector, using Angular's [**By**](https://angular.io/api/platform-browser/**By**).

Certainly, there are several valid and elaborate approaches.

**Triggering event handlers**
It is a common task in tests to simulate user input like clicking, typing in text, moving pointers and pressing keys. From an Angular perspective, user input causes DOM events.
The Component template registers event handlers using the schema (event)="handler($event)". In the test, we need to simulate an event to call these handlers.
DebugElement has a useful method for firing events: triggerEventHandler.

```ts
reset.triggerEventHandler('click', {
  /* … Event properties
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0 */
});
```

This example fires a click event on the reset button. 
Since the template contains (click)="reset()", the reset method of component will be called.

triggerEventHandler does **not simulate event bubbling or any other effect a real event might have**.

**Testing inputs**
If you want to test a component under different conditions, you will probably have to change some of its @Input() values and check if it emits @Output()s when expected.

```ts
@Component(...)
class MyComponent {
  @Input() someInput: string;
}
/* ... */
myComponent.someInput = 'foo';
fixture.detectChanges(); // To update the view
```

If you are doing stuff in ngOnChanges, you will have to call it manually since **ngOnChanges is not called automatically in tests** during programmatic input changes.

```ts
myComponent.someInput = 'foo';
myComponent.ngOnChanges({ someInput: { currentValue: 'foo' } } as SimpleChange);
fixture.detectChanges();
```

**Testing outputs**
```ts
@Component(
  template: `<button (click)="onClick()">`
)
export class MyComponent {
  @Output() public myClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    this.myClick.emit();
  }
}
/* ... */
spyOn(component.myClick, 'emit');
expect(component.myClick.emit).not.toHaveBeenCalled();
fixture.debugElement.query(By.css('button')).nativeElement.click();
expect(component.myClick.emit).toHaveBeenCalled(); // .toHaveBeenCalledWith(someValue);
```