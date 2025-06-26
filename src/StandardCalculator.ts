import { Calculator } from "./framework/Calculator";

export class StandardCalculator implements Calculator {

    constructor() {
        
    }

    getLapDistance(): number {
        throw new Error("Method not implemented.");
    }
    getClimbingTime(): number {
        throw new Error("Method not implemented.");
    }
    getTotalNumberOfLaps(): number {
        throw new Error("Method not implemented.");
    }
    getTotalDistance(): number {
        throw new Error("Method not implemented.");
    }
    calculateClimbingWatts(totalWeight: number, climbHeight: number, climbingTime: number): number {
        throw new Error("Method not implemented.");
    }
    calculateAirResistanceWatts(climbingSpeed: number): number {
        throw new Error("Method not implemented.");
    }
    calculateRollingResistanceWatts(weight: number, climbingSpeed: number): number {
        throw new Error("Method not implemented.");
    }

}