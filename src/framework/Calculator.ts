export interface Calculator {
    getLapDistance(): number;
    getClimbingTime(): number;
    getTotalNumberOfLaps(): number;
    getTotalDistance(): number;
    calculateClimbingWatts(totalWeight: number, climbHeight: number, climbingTime: number): number;
    calculateAirResistanceWatts(climbingSpeed: number): number;
    calculateRollingResistanceWatts(weight: number, climbingSpeed: number): number;
}