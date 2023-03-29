declare namespace jasmine {
  interface Matchers<T> {
    is<T>(expected: T): boolean;
  }
} 
