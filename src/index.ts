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

const totalWattsText: HTMLDivElement = document.querySelector("#totalWattsText")!;
const totalDistanceText: HTMLDivElement = document.querySelector("#totalDistanceText")!;
const lapDistanceText: HTMLDivElement = document.querySelector("#lapDistanceText")!;

const calculatedWattsBox: HTMLDivElement = document.querySelector("#calculatedWattsBox")!;
const expandedWattsCalculationBox: HTMLDivElement = document.querySelector("#expandedWattsCalculations")!;
const wattsPopupBox: HTMLDivElement = document.querySelector("#wattsPopupContent")!;

// Dynamic focus
document.querySelectorAll<HTMLDivElement>(".entryDiv").forEach((entry) => {
    let inputField: HTMLInputElement = entry.querySelector("input")!;

    entry.addEventListener("focus", () => {
        inputField.focus();
        entry.classList.toggle("entryDivFocus");
    });

    inputField.addEventListener("blur", () => {
        entry.classList.toggle("entryDivFocus");
    });
});

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
    console.log("Button pressed");
    // TODO: Guard check

    let distanceOfClimb: number = parseFloat(distanceOfClimbInput.value);
    let elevationGain: number = parseFloat(elevationGainInput.value);
    let totalWeight: number = parseFloat(totalWeightInput.value);
    let climbingSpeed: number = parseFloat(climbingSpeedInput.value);
    let descendingSpeed: number = parseFloat(descendingSpeedInput.value);
    let restStopTime: number = parseFloat(restStopSlider.value);
    let numberOfRestStops: number = parseFloat(totalNumberOfRestStopInput.value);

    calculator.updateData(distanceOfClimb, elevationGain, climbingSpeed, totalWeight);
    updateCalculationText();
    updateWattsPopupCalculationText();
});

function updateCalculationText() {
    totalWattsText.innerHTML = calculator.getTotalWatts().toString() + "w";
    totalDistanceText.innerHTML = calculator.getTotalDistance().toString() + "km";
    lapDistanceText.innerHTML = calculator.getLapDistance().toString() + "km";
}

function updateWattsPopupCalculationText() {
    let gravityWattsText: HTMLDivElement = document.querySelector("#gravityWattsText")!;
    let airWattsText: HTMLDivElement = document.querySelector("#airWattsText")!;
    let rollingWattsText: HTMLDivElement = document.querySelector("#rollingWattsText")!;

    let calculationField: HTMLDivElement = document.querySelector("#calculationField")!;

    let gravityWatts: string = calculator.getClimbingWatts().toFixed(2);
    let airWatts: string = calculator.getAirResistancyWatts().toFixed(2);
    let rollingWatts: string = calculator.getRollingResistancyWatts().toFixed(2);
    let totalWatts: string = calculator.getTotalWatts().toFixed(2);

    gravityWattsText.innerHTML = gravityWatts + "w";
    airWattsText.innerHTML = airWatts + "w";
    rollingWattsText.innerHTML = rollingWatts + "w";

    calculationField.innerHTML = gravityWatts + "+" + airWatts + "+" + rollingWatts + " = " + totalWatts + "w";
}

calculatedWattsBox.addEventListener("click", () => { expandedWattsCalculationBox.style.display = "flex"; });

wattsPopupBox.addEventListener("click", event => { event.stopPropagation(); });
expandedWattsCalculationBox.addEventListener("click", () => { expandedWattsCalculationBox.style.display = "none"; });
