import { Calculator } from "./framework/Calculator";
import { StandardCalculator } from "./StandardCalculator.js";

const calculator: Calculator = new StandardCalculator();

console.log("Hello from index file");

const calculateButton: HTMLButtonElement = document.querySelector("#calculateDataButton")!;

const distanceOfClimbInput: HTMLInputElement = document.querySelector("#climbingDistance")!;
const elevationGainInput: HTMLInputElement = document.querySelector("#elevation")!;
const totalWeightInput: HTMLInputElement = document.querySelector("#totalWeight")!;
const climbingSpeedInput: HTMLInputElement = document.querySelector("#climbingSpeed")!;
const descendingSpeedInput: HTMLInputElement = document.querySelector("#descentSpeed")!;

const restStopSlider: HTMLInputElement = document.querySelector("#restStopTime")!; 
const restStopSliderTimerText: HTMLDivElement = document.querySelector("#restStopTimeDisplayText")!;

const totalNumberOfRestStopInput: HTMLInputElement = document.querySelector("#totalRestStops")!;

restStopSlider.addEventListener("input", () => {
    const timeValue: number = parseInt(restStopSlider.value);
    restStopSliderTimerText.innerHTML = formatTime(timeValue);  
});

function formatTime(timeValue: number): string {
    const minutes: string = Math.floor(timeValue / 60).toString().padStart(2, "0");
    const seconds: string = (timeValue % 60).toString().padStart(2, "0");
    return `${minutes}m:${seconds}s`;
}

calculateButton.addEventListener("click", () => {

    // TODO: Guard check

    let distanceOfClimb: number = parseFloat(distanceOfClimbInput.value);
    let elevationGain: number = parseFloat(elevationGainInput.value);
    let totalWeight: number = parseFloat(totalWeightInput.value);
    let climbingSpeed: number = parseFloat(climbingSpeedInput.value);
    let descendingSpeed: number = parseFloat(descendingSpeedInput.value);
    let restStopTime: number = parseFloat(restStopSlider.value);
    let numberOfRestStops: number = parseFloat(totalNumberOfRestStopInput.value);

    calculator.updateData(distanceOfClimb, elevationGain, climbingSpeed, totalWeight);
})
