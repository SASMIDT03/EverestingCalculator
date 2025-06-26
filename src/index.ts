console.log("Hello from index file");

const restStopSlider: HTMLInputElement = document.querySelector("#restStopTime")!; 
const restStopSliderTimerText: HTMLDivElement = document.querySelector("#restStopTimeDisplayText")!;

restStopSlider.addEventListener("input", () => {
    const timeValue: number = parseInt(restStopSlider.value);
    restStopSliderTimerText.innerHTML = formatTime(timeValue);  
});

function formatTime(timeValue: number): string {
    const minutes: string = Math.floor(timeValue / 60).toString().padStart(2, "0");
    const seconds: string = (timeValue % 60).toString().padStart(2, "0");
    return `${minutes}m:${seconds}s`;
}