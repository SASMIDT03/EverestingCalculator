import { CalculationsConstants } from "./CalculationConstants";

export interface MutableCalculationConstants extends CalculationsConstants {
    /*
    HeightOfMountEverest = 8849,
    LocalGravitationalConstant = 9.82, // Local for Denmark
    AirDensity = 1.22601, // Approx at 15 celcius
    CDA = 0.63,
    FrontalArea = 0.5,
    RollingCoefficient = 0.005,
    DriveTrainLoss = 0.03
    */

    setLocalGravitationalConstant(newLocalGravitationalConstant: number): void;

    setAirDensity(newAirDensity: number): void;

    setCDA(newCDA: number): void;

    setFrontalArea(newFrontalArea: number): void;

    setRollingCoefficient(newRollingCoefficient: number): void;

    setDrivetrainLoss(newDrivetrainLoss: number): void;
}