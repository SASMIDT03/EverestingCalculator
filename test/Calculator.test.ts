import { beforeEach, test, expect } from 'vitest';
import { StandardCalculator } from '../src/StandardCalculator';
import type { Calculator } from '../src/framework/Calculator';

let calculator: Calculator;

beforeEach(() => {
  calculator = new StandardCalculator();
});

test("TestTEst", () => {
    expect(3).toBe(3);
})