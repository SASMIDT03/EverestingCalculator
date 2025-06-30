import { Calculator } from "./framework/Calculator";
import { CalculationConstants } from "./CalculationConstants.js";

export class StandardCalculator implements Calculator {
    private climbHeight: number;
    private totalWeight: number;
    private climbingSpeed: number;

    private lapDistance: number;
    private climbingTime: number;
    private totalNumberOfLaps: number;
    private totalDistance: number;
    
    constructor() {
        this.climbHeight = 0;
        this.totalWeight = 0;
        this.climbingSpeed = 0;

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
        this.climbHeight = elevationGain;
        this.totalWeight = totalWeight;
        this.climbingSpeed = climbingSpeed;

        this.lapDistance = 2 * climbingDistance;
        this.climbingTime = climbingDistance / climbingSpeed * 60 * 60;
        this.totalNumberOfLaps = Math.round(CalculationConstants.HeightOfMountEverest / elevationGain);
        this.totalDistance = parseFloat((this.totalNumberOfLaps * this.lapDistance).toFixed(2));

        // update watts
    }

    calculateClimbingWatts(totalWeight: number, climbHeight: number, climbingTime: number): number {
        return (totalWeight * CalculationConstants.LocalGravitationalConstant * climbHeight) / climbingTime;
    }

    calculateAirResistanceWatts(climbingSpeed: number): number {
        const airDensity = CalculationConstants.AirDensity;
        const cda = CalculationConstants.CDA;
        const frontalArea = CalculationConstants.FrontalArea;

        return (1/2) * airDensity * cda * frontalArea * (climbingSpeed / 3.6)**3;
    }

    calculateRollingResistanceWatts(weight: number, climbingSpeed: number): number {
        const rollingCoefficient = CalculationConstants.RollingCoefficient;

        return weight * CalculationConstants.LocalGravitationalConstant * rollingCoefficient * (climbingSpeed / 3.6)
    }

    calculateTotalWatts(): number {
        const driveTrainLoss = CalculationConstants.DriveTrainLoss;

        let climbingWatts = this.calculateClimbingWatts(this.totalWeight, this.climbHeight, this.climbingTime);
        let airWatts = this.calculateAirResistanceWatts(this.climbingSpeed);
        let rollingWatts = this.calculateRollingResistanceWatts(this.totalWeight, this.climbingSpeed);

        let totalWatts: number = climbingWatts + airWatts + rollingWatts;
        return totalWatts + (totalWatts * driveTrainLoss);
    }
}