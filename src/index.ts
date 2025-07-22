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
const totalLapsText: HTMLDivElement = document.querySelector("#totalLapsText")!;
const totalTimeText: HTMLDivElement = document.querySelector("#totalTimeText")!;

const calculatedWattsBox: HTMLDivElement = document.querySelector("#calculatedWattsBox")!;
const expandedWattsCalculationBox: HTMLDivElement = document.querySelector("#expandedWattsCalculations")!;
const wattsPopupBox: HTMLDivElement = document.querySelector("#wattsPopupContent")!;

const calculatedDistanceBox: HTMLDivElement = document.querySelector("#calulatedDistanceBox")!;
const distancePopupBox: HTMLDivElement = document.querySelector("#distancePopupContent")!;

const calculatedLapsBox: HTMLDivElement = document.querySelector("#calulatedLapsBox")!;
const lapsPopupBox: HTMLDivElement = document.querySelector("#lapsPopupContent")!;

const calculatedTotalTimeBox: HTMLDivElement = document.querySelector("#calculatedTotalTimeBox")!;
const timePopupBox: HTMLDivElement = document.querySelector("#timePopupContent")!;

// Dynamic focus
document.querySelectorAll<HTMLDivElement>(".entryDiv").forEach((entry) => {
    let inputField: HTMLInputElement = entry.querySelector("input")!;

    entry.addEventListener("focus", () => {
        inputField.focus();
        entry.classList.add("entryDivFocus");
    });

    inputField.addEventListener("focus", () => {
        entry.classList.add("entryDivFocus");
    })

    inputField.addEventListener("blur", () => {
        console.log("Lost focus");
        entry.classList.remove("entryDivFocus");
    });
});

restStopSlider.addEventListener("input", () => {
    const timeValue: number = parseInt(restStopSlider.value);
    restStopSliderTimerText.innerHTML = formatTime(timeValue);  
});

function formatTime(timeValue: number): string {
    let timeString: string = "";
    let seconds: string = "";
    const hoursTmp: number = Math.floor(timeValue / (60 * 60));
    if (hoursTmp !== 0) {
        timeValue -= 60 * 60 * hoursTmp;
        timeString = `${hoursTmp.toString().padStart(2, "0")}h:`
    }
    else { seconds = ":" + Math.round((timeValue % 60)).toString().padStart(2, "0") + "s"; }
    const minutes: string = Math.floor(timeValue / 60).toString().padStart(2, "0");
    
    return timeString + `${minutes}m${seconds}`;
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

    calculator.updateData(distanceOfClimb, elevationGain, climbingSpeed, totalWeight, descendingSpeed,
                          restStopTime, numberOfRestStops
    );
    updateCalculationText();
    updateWattsPopupCalculationText();
    updateDistancePopupContent();
    updateLapsPopupContent();
    updateTimePopupContent();
});

function updateCalculationText() {
    totalWattsText.innerHTML = calculator.getTotalWatts().toString() + "w";
    totalDistanceText.innerHTML = calculator.getTotalDistance().toString() + "km";
    totalLapsText.innerHTML = calculator.getTotalNumberOfLaps().toString();
    totalTimeText.innerHTML = formatTime(calculator.getTotalTime());
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

function updateDistancePopupContent() {
    let lapDistanceText: HTMLDivElement = document.querySelector("#lapDistanceText")!;
    let totalDistanceText: HTMLDivElement = document.querySelector("#totalDistanceTextPop")!;

    lapDistanceText.innerHTML = calculator.getLapDistance().toFixed(2) + "km";
    totalDistanceText.innerHTML = calculator.getTotalDistance().toFixed(2) + "km";
}

function updateLapsPopupContent() {
    let totalLapsText: HTMLDivElement = document.querySelector("#totalLapsTextPop")!;

    totalLapsText.innerHTML = calculator.getTotalNumberOfLaps().toString();
}

function updateTimePopupContent() {
    let climbingTime: HTMLDivElement = document.querySelector("#climbingTimeText")!;
    let totalClimbingTime: HTMLDivElement = document.querySelector("#totalClimbingTimeText")!;
    let descendingTime: HTMLDivElement = document.querySelector("#descendingTimeText")!;
    let totalDescendingTime: HTMLDivElement = document.querySelector("#totalDescendingTimeText")!;
    let totalRestStopTime: HTMLDivElement = document.querySelector("#restStopTimeText")!;
    let totalTime: HTMLDivElement = document.querySelector("#totalTimePopupText")!;

    climbingTime.innerHTML = formatTime(calculator.getClimbingTime());
    totalClimbingTime.innerHTML = formatTime(calculator.getTotalClimbingTime());
    descendingTime.innerHTML = formatTime(calculator.getDescendingTime());
    totalDescendingTime.innerHTML = formatTime(calculator.getTotalDescendingTime());
    totalRestStopTime.innerHTML = formatTime(calculator.getTotalRestStopTime());
    totalTime.innerHTML = formatTime(calculator.getTotalTime());
}

calculatedWattsBox.addEventListener("click", () => { 
    expandedWattsCalculationBox.style.display = "flex";
    wattsPopupBox.style.display = "flex";
});

wattsPopupBox.addEventListener("click", event => { event.stopPropagation(); });
expandedWattsCalculationBox.addEventListener("click", () => { 
    expandedWattsCalculationBox.style.display = "none";
    wattsPopupBox.style.display = "none";
    distancePopupBox.style.display = "none";
    lapsPopupBox.style.display = "none";
    timePopupBox.style.display = "none";
});

calculatedDistanceBox.addEventListener("click", () => {
    expandedWattsCalculationBox.style.display = "flex";
    
    distancePopupBox.style.display = "flex";
    distancePopupBox.addEventListener("click", event => { event.stopPropagation(); });
});

calculatedLapsBox.addEventListener("click", () => {
    expandedWattsCalculationBox.style.display = "flex";

    lapsPopupBox.style.display = "flex";
    lapsPopupBox.addEventListener("click", event => { event.stopPropagation(); } );
});

calculatedTotalTimeBox.addEventListener("click", () => {
    expandedWattsCalculationBox.style.display = "flex";

    timePopupBox.style.display = "flex";
    timePopupBox.addEventListener("click", event => { event.stopPropagation(); });
})
