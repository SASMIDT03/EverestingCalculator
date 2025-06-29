/**
 * This Class is responsible for calculating the watts and related data for an everest on a specific climb
 * 
 */
export interface Calculator {
    /**
     * @return Returns the distance of one lap
     */
    getLapDistance(): number;

    /**
     * @return Returns the time it takes to complete one ascent (ss)
     */
    getClimbingTime(): number;

    /**
     * @return Returns the total amount of laps required to complete an everest
     */
    getTotalNumberOfLaps(): number;

    /**
     * @return Returns the total distance required to complete an everest
     */
    getTotalDistance(): number;

    /**
     * Updates all the datapoints used in the watts calculation
     * 
     * @param climbingDistance Length of the climb
     * @param elevationGain Total elevation gain from one ascent of the climb
     * @param climbingSpeed Speed of climbing
     * @param totalWeight Total weight of rider and equipment (kg)
     */
    updateData(climbingDistance: number, elevationGain: number, climbingSpeed: number,
               totalWeight: number
    ): void;

    /**
     * Calculates the required amount of watts to overcome gravity
     * 
     * @param totalWeight Total weight of rider and equipment (kg)
     * @param elevationGain Total elevation gain from one ascent of the climb
     * @param climbingTime The time it takes to complete one ascent of the climb
     * 
     * @return The required amount of watts
     */
    calculateClimbingWatts(totalWeight: number, elevationGain: number, climbingTime: number): number;

    /**
     * Calculates the required amount of watts to overcome airresistancy
     * 
     * @param climbingSpeed Speed of climbing
     * 
     * @return The required amount of watts
     */
    calculateAirResistanceWatts(climbingSpeed: number): number;

    /**
     * Calculates the required amount of watts to overcome rollingresistancy
     * 
     * @param totalWeight Total weight of rider and equipment (kg)
     * @param climbingSpeed Speed of climbing
     * 
     * @return The required amount of watts
     */
    calculateRollingResistanceWatts(totalWeight: number, climbingSpeed: number): number;
}