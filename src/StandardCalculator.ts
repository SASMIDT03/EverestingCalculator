import { Calculator } from "./framework/Calculator";
import { CalculationsConstants } from "./framework/CalculationConstants";
import { StandardCalculationConstants } from "./StandardCalculationConstants.js";

export class StandardCalculator implements Calculator {
    private climbHeight: number;
    private totalWeight: number;
    private climbingSpeed: number;

    private lapDistance: number;

    private climbingTime: number;
    private totalClimbingTime: number;
    private descendingTime: number;
    private totalDescendingTime: number;
    private totalTime: number;
    private totalRestStopTime: number;

    private totalNumberOfLaps: number;
    private totalDistance: number;

    private climbingWatts: number;
    private airResitanceWatts: number;
    private rollingResistanceWatts: number;
    private totalWatts: number;

    private calculationConstants: CalculationsConstants = StandardCalculationConstants.getInstance();
    
    constructor() {
        this.climbHeight = 0;
        this.totalWeight = 0;
        this.climbingSpeed = 0;

        this.lapDistance = 0;

        this.climbingTime = 0;
        this.totalClimbingTime = 0;
        this.descendingTime = 0;
        this.totalDescendingTime = 0;
        this.totalTime = 0;
        this.totalRestStopTime = 0;

        this.totalNumberOfLaps = 0;
        this.totalDistance = 0;

        this.climbingWatts = 0;
        this.airResitanceWatts = 0;
        this.rollingResistanceWatts = 0;
        this.totalWatts = 0;
    }

    getLapDistance(): number {
        return parseFloat(this.lapDistance.toFixed(2));
    }
    getClimbingTime(): number {
        return this.climbingTime;
    }

    getTotalClimbingTime(): number {
        return this.totalClimbingTime;
    }

    getDescendingTime(): number {
        return this.descendingTime;
    }

    getTotalDescendingTime(): number {
        return this.totalDescendingTime;
    }

    getTotalTime(): number {
        return this.totalTime;
    }

    getTotalRestStopTime(): number {
        return this.totalRestStopTime;
    }

    getTotalNumberOfLaps(): number {
        return Math.ceil(this.totalNumberOfLaps);
    }
    getTotalDistance(): number {
        return parseFloat(this.totalDistance.toFixed(2));
    }

    getClimbingWatts(): number {
        return parseFloat(this.climbingWatts.toFixed(2));
    }
    getAirResistancyWatts(): number {
        return parseFloat(this.airResitanceWatts.toFixed(2));
    }
    getRollingResistancyWatts(): number {
        return parseFloat(this.rollingResistanceWatts.toFixed(2));
    }
    getTotalWatts(): number {
        return parseFloat(this.totalWatts.toFixed(2));
    }

    updateData(climbingDistance: number, elevationGain: number, climbingSpeed: number, totalWeight: number, 
        descendingSpeed: number, restStopTime: number,
        totalNumbersOfRestStops: number): void {
        this.climbHeight = elevationGain;
        this.totalWeight = totalWeight;
        this.climbingSpeed = climbingSpeed;

        this.lapDistance = 2 * climbingDistance;
        this.totalNumberOfLaps = Math.round(this.calculationConstants.getHeightOfMountEverest() / elevationGain);

        this.climbingTime = climbingDistance / climbingSpeed * 60 * 60;
        this.totalClimbingTime = this.climbingTime * this.totalNumberOfLaps;
        this.descendingTime = climbingDistance / descendingSpeed * 60 * 60;
        this.totalDescendingTime = this.descendingTime * this.totalNumberOfLaps;
        this.totalRestStopTime = restStopTime * totalNumbersOfRestStops;
        this.totalTime = this.totalClimbingTime + this.totalDescendingTime + restStopTime;
        this.totalDistance = parseFloat((this.totalNumberOfLaps * this.lapDistance).toFixed(2));

        this.climbingWatts = this.calculateClimbingWatts(this.totalWeight, this.climbHeight, this.climbingTime);
        this.airResitanceWatts = this.calculateAirResistanceWatts(this.climbingSpeed);
        this.rollingResistanceWatts = this.calculateRollingResistanceWatts(this.totalWeight, this.climbingSpeed);

        this.totalWatts = this.calculateTotalWatts(this.climbingWatts, this.airResitanceWatts, this.rollingResistanceWatts);
    }

    calculateClimbingWatts(totalWeight: number, climbHeight: number, climbingTime: number): number {
        return (totalWeight * this.calculationConstants.getLocalGravitationalConstant() * climbHeight) / climbingTime;
    }

    calculateAirResistanceWatts(climbingSpeed: number): number {
        const airDensity = this.calculationConstants.getAirDensity();
        const cda = this.calculationConstants.getCDA();
        const frontalArea = this.calculationConstants.getFrontalArea();

        return (1/2) * airDensity * cda * frontalArea * (climbingSpeed / 3.6)**3;
    }

    calculateRollingResistanceWatts(weight: number, climbingSpeed: number): number {
        const rollingCoefficient = this.calculationConstants.getRollingCoefficient();
        const localGravitationalConstant = this.calculationConstants.getLocalGravitationalConstant()

        return weight * localGravitationalConstant * rollingCoefficient * (climbingSpeed / 3.6)
    }

    calculateTotalWatts(climbingWatts: number, airWatts: number, rollingWatts: number): number {
        const driveTrainLoss = this.calculationConstants.getDriveTrainLoss();

        let totalWatts: number = climbingWatts + airWatts + rollingWatts;

        return totalWatts + (totalWatts * driveTrainLoss);
    }
}