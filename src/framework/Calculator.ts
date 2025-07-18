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
     * @return Returns the total time spend climbing to complete an everest
     */
    getTotalClimbingTime(): number;

    /**
     * @return Returns the time it takes to complete one descent (ss)
     */
    getDescendingTime(): number;

    /**
     * @return Returns the total time spend descending to complete an everest
     */
    getTotalDescendingTime(): number;

    /**
     * @return Returns the total time it takes to complete an everest (ss)
     */
    getTotalTime(): number;

    /**
     * @return Returns the total amount of time to rest (ss)
     */
    getTotalRestStopTime(): number;

    /**
     * @return Returns the total amount of laps required to complete an everest
     */
    getTotalNumberOfLaps(): number;

    /**
     * @return Returns the total distance required to complete an everest
     */
    getTotalDistance(): number;

    /**
     * @return Returns the required amount of watts to overcome gravity
     */
    getClimbingWatts(): number;

    /**
     * @return Returns the required amount of watts to overcome air resistancy
     */
    getAirResistancyWatts(): number;

    /**
     * @return Returns the required amount of watts to overcome rolling resistancy
     */
    getRollingResistancyWatts(): number;

    /**
     * @return Returns the total amount of watts required to climb a specific segment
     */
    getTotalWatts(): number;

    /**
     * Updates all the datapoints used in the watts calculation
     * 
     * @param climbingDistance Length of the climb
     * @param elevationGain Total elevation gain from one ascent of the climb
     * @param climbingSpeed Speed of climbing
     * @param totalWeight Total weight of rider and equipment (kg)
     */
    updateData(climbingDistance: number, elevationGain: number, climbingSpeed: number,
               totalWeight: number, descendingSpeed: number, restStopTime: number,
               totalNumbersOfRestStops: number
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

    /**
     * Calculates the total amount of watts for climbing at a specific speed
     * 
     * @param climbingWatts The required amount of watts to overcome gravity
     * @param airWatts The required amount of watts to overcome air resistancy
     * @param rollingWatts The required amount of watts to overcome rolling resistancy
     * 
     * @return The total amount of watts
     */
    calculateTotalWatts(climbingWatts: number, airWatts: number, rollingWatts: number): number;
}