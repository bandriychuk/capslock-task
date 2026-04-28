import { test } from '@playwright/test';

/**
 * Decorator that wraps a function with a Playwright test step.
 * Used for reporting purposes.
 *
 * Every decorated async method becomes a boxed Playwright step whose name is
 * either the explicit `message` argument or the combination of class and
 * method name. This makes the HTML report and trace output significantly
 * easier to read during debugging.
 *
 * @typeParam This Class instance type for the decorated method.
 * @typeParam Args Tuple of method argument types.
 * @typeParam Return Async return type of the decorated method.
 * @param message Optional custom step name shown in Playwright reports.
 * @returns A decorator function that wraps the original method in
 * `test.step(...)`.
 * @example
 ```
    import { step } from './step_decorator';
    class MyTestClass {
        @step('optional step name')
        async myTestFunction() {
            // Test code goes here
        }
    }
 ```
 */
export function step<This, Args extends any[], Return>(message?: string) {
  /**
   * Actual decorator implementation applied by TypeScript to the target
   * method.
   *
   * @param target Original async method.
   * @param context Decorator metadata provided by the runtime.
   * @returns Replacement method that reports itself as a Playwright step.
   */
  return function actualDecorator(target: (this: This, ...args: Args) => Promise<Return>, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>) {
    /**
     * Wrapper executed instead of the original method.
     *
     * @param args Original method arguments.
     * @returns Result of the wrapped async method.
     */
    function replacementMethod(this: any, ...args: Args) {
      const name = message ?? `${this.constructor.name}.${context.name as string}`;

      return test.step(name, async () => target.call(this, ...args), { box: true });
    }

    return replacementMethod;
  }
}
