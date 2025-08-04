import { CalculationsConstants } from "./framework/CalculationConstants";
import { MutableCalculationConstants } from "./framework/MutableCalculationConstants";

export class StandardCalculationConstants implements CalculationsConstants, MutableCalculationConstants {

    static #instance: StandardCalculationConstants;

    private heightOfMountEverest: number;
    private localGravitationalConstant: number;
    private airDensity: number;
    private CDA: number;
    private frontalArea: number;
    private rollingCoefficient: number;
    private drivetrainLoss: number;

    private constructor() {
        this.heightOfMountEverest = 8849;
        this.localGravitationalConstant = 9.82; // Local for Denmark
        this.airDensity = 1.22601; // Approx at 15 celcius
        this.CDA = 0.63;
        this.frontalArea = 0.5;
        this.rollingCoefficient = 0.005;
        this.drivetrainLoss = 0.03;
    }

    public static getInstance(): StandardCalculationConstants {
        if (!StandardCalculationConstants.#instance) { StandardCalculationConstants.#instance = new StandardCalculationConstants(); }

        return StandardCalculationConstants.#instance;
    }

    getHeightOfMountEverest(): number {
        return this.heightOfMountEverest;
    }
    getLocalGravitationalConstant(): number {
        return this.localGravitationalConstant;
    }
    getAirDensity(): number {
        return this.airDensity;
    }
    getCDA(): number {
        return this.CDA;
    }
    getFrontalArea(): number {
        return this.frontalArea;
    }
    getRollingCoefficient(): number {
        return this.rollingCoefficient;
    }
    getDriveTrainLoss(): number {
        return this.drivetrainLoss;
    }
    setLocalGravitationalConstant(newLocalGravitationalConstant: number): void {
        this.localGravitationalConstant = newLocalGravitationalConstant;
    }
    setAirDensity(newAirDensity: number): void {
        this.airDensity = newAirDensity;
    }
    setCDA(newCDA: number): void {
        this.CDA = newCDA
    }
    setFrontalArea(newFrontalArea: number): void {
        this.frontalArea = newFrontalArea;
    }
    setRollingCoefficient(newRollingCoefficient: number): void {
        this.rollingCoefficient = newRollingCoefficient;
    }
    setDrivetrainLoss(newDrivetrainLoss: number): void {
        this.drivetrainLoss = newDrivetrainLoss;
    }
    
}