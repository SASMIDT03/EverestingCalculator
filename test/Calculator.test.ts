import { beforeEach, test, expect } from 'vitest';
import { StandardCalculator } from '../src/StandardCalculator';
import type { Calculator } from '../src/framework/Calculator';

let calculator: Calculator;

beforeEach(() => {
  calculator = new StandardCalculator();
});

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
  calculator.updateData(2.05, 0, 0, 0);
  expect(calculator.getLapDistance()).toBe(4.1);
})

test("Should have climbingTime x for climbDistance 2.05, climbingSpeed 14.5", () => {
  calculator.updateData(2.05, 0, 14.5, 0);
  expect(calculator.getClimbingTime()).toBe(508.9655172413792);
})

test("Should have totalNumberOfLaps 101 for climbDistance 2.05, elevationGain 88", () => {
  calculator.updateData(2.05, 88, 0, 0);
  expect(calculator.getTotalNumberOfLaps()).toBe(101);
})

test("Should have totalDistance 404 for climbDistance 2.05, elevationGain 88", () => {
  calculator.updateData(2.05, 88, 0, 0);
  expect(calculator.getTotalDistance()).toBe(414.1);
})

test("Should have gravityWatts 120 for totalWeight 71, elevationGain 88, climbingTime 508", () => {
  expect(calculator.calculateClimbingWatts(71, 88, 508.9655172413792)).toBe(120.54914905149055);
})

test("Should have airRestitancyWatts 10 for climbingSpeed 14.5", () => {
  expect(calculator.calculateAirResistanceWatts(14.5)).toBe(10.005587772740911);
})

test("Should have rollingResistancyWatts 11 for totalWeight 71, climbingSpeed 14.5", () => {
  expect(calculator.calculateRollingResistanceWatts(71, 14.5)).toBe(11.23298888888889);
})

test("Should have totalWatts 145.23 for gravityWatts 120, airRestitancyWatts 10, rollingResistancyWatts 11", () => {
  expect(calculator.calculateTotalWatts(120, 10, 11)).toBe(145.23);
})