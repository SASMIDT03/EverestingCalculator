import { beforeEach, test, expect } from 'vitest';
import { StandardCalculator } from '../src/StandardCalculator';
import type { Calculator } from '../src/framework/Calculator';

let calculator: Calculator;

beforeEach(() => {
  calculator = new StandardCalculator();
});

function updateData(): void {
  calculator.updateData(2.05, 88, 14.5, 71);
}

test("Should return lapDistance 0 for empty calculator", () => {
    expect(calculator.getLapDistance()).toBe(0);
})

test("Should return climbingTime 0 for empty calculator", () => {
  expect(calculator.getClimbingTime()).toBe(0);
})

test("Should return total number of laps 0 for empty calculator", () => {
  expect(calculator.getTotalNumberOfLaps()).toBe(0);
})

test("Should return totalDistance 0 for empty calculator", () => {
  expect(calculator.getTotalDistance()).toBe(0);
})

test("Should have lapDistance 4.1 when climbDistance updated to 2.05", () => {
  updateData();
  expect(calculator.getLapDistance()).toBe(4.1);
})

test("Should have climbingTime x for climbDistance 2.05, climbingSpeed 14.5", () => {
  updateData();
  expect(calculator.getClimbingTime()).toBe(508.9655172413792);
})

test("Should have totalNumberOfLaps 101 for climbDistance 2.05, elevationGain 88", () => {
  updateData();
  expect(calculator.getTotalNumberOfLaps()).toBe(101);
})

test("Should have totalDistance 404 for climbDistance 2.05, elevationGain 88", () => {
  updateData();
  expect(calculator.getTotalDistance()).toBe(414.1);
})

test("Should have gravityWatts 120 for totalWeight 71, elevationGain 88, climbingTime 508", () => {
  expect(calculator.calculateClimbingWatts(71, 88, 508.9655172413792)).toBe(120.54914905149055);
})

test("Should have airRestitancyWatts 12.6 for climbingSpeed 14.5", () => {
  expect(calculator.calculateAirResistanceWatts(14.5)).toBe(12.617434969979744);
})

test("Should have rollingResistancyWatts 14 for totalWeight 71, climbingSpeed 14.5", () => {
  expect(calculator.calculateRollingResistanceWatts(71, 14.5)).toBe(14.041236111111113);
})

test("Should have totalWatts 152", () => {
  updateData();
  expect(calculator.calculateTotalWatts(120.54914905149055, 12.617434969979744, 14.041236111111113)).toBe(151.62405473655886);
})