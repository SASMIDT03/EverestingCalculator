import { Calculator } from "./framework/Calculator";

export class StandardCalculator implements Calculator {
    private lapDistance: number;
    private climbingTime: number;
    private totalNumberOfLaps: number;
    private totalDistance: number;
    
    constructor() {
        this.lapDistance = 0;
        this.climbingTime = 0;
        this.totalNumberOfLaps = 0;
        this.totalDistance = 0;
    }

    getLapDistance(): number {
        return this.lapDistance;
    }
    getClimbingTime(): number {
        return this.climbingTime;
    }
    getTotalNumberOfLaps(): number {
        return this.totalNumberOfLaps;
    }
    getTotalDistance(): number {
        return this.totalDistance;
    }

    updateData(climbingDistance: number, elevationGain: number, climbingSpeed: number, totalWeight: number): void {
        this.lapDistance = 2 * climbingDistance;
        this.climbingTime = climbingDistance / climbingSpeed * 60 * 60;
        this.totalNumberOfLaps = Math.round(8849 / elevationGain);
        this.totalDistance = parseFloat((this.totalNumberOfLaps * this.lapDistance).toFixed(2));

        // update watts
    }

    calculateClimbingWatts(totalWeight: number, climbHeight: number, climbingTime: number): number {
        return (totalWeight * 9.82 * climbHeight) / climbingTime;
    }

    calculateAirResistanceWatts(climbingSpeed: number): number {
        const airDensity = 1.225;
        const cda = 0.5;
        const frontalArea = 0.5;

        return (1/2) * airDensity * cda * frontalArea * (climbingSpeed / 3.6)**3;
    }

    calculateRollingResistanceWatts(weight: number, climbingSpeed: number): number {
        const rollingCoefficient = 0.004

        return weight * 9.82 * rollingCoefficient * (climbingSpeed / 3.6)
    }

}