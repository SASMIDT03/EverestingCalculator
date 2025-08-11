import { MutableCalculationConstants } from "./framework/MutableCalculationConstants";
import { StandardCalculationConstants } from "./StandardCalculationConstants.js";

console.log("Hello from settingsHandler");

const calculationConstants: MutableCalculationConstants = StandardCalculationConstants.getInstance();

const popupMainWindow: HTMLDivElement = document.querySelector("#popupMainWindow")!;

const localGravitationalConstantInput: HTMLInputElement = popupMainWindow.querySelector("#localGravitationalConstantInput")!;
const airDensityInput: HTMLInputElement = popupMainWindow.querySelector("#airDensityInput")!;
const cdaInput: HTMLInputElement = popupMainWindow.querySelector("#cdaInput")!;
const frontalAreaInput: HTMLInputElement = popupMainWindow.querySelector("#frontalAreaInput")!;
const rollingCoefficientInput: HTMLInputElement = popupMainWindow.querySelector("#rollingCoefficientInput")!;
const drivetrainLossInput: HTMLInputElement = popupMainWindow.querySelector("#drivetrainLossInput")!;

const saveButton: HTMLButtonElement = popupMainWindow.querySelector("#saveSettingsButton")!;

function setConstantValues(): void {
    localGravitationalConstantInput.value = calculationConstants.getLocalGravitationalConstant().toString();
    airDensityInput.value = calculationConstants.getAirDensity().toString();
    cdaInput.value = calculationConstants.getCDA().toString();
    frontalAreaInput.value = calculationConstants.getFrontalArea().toString();
    rollingCoefficientInput.value = calculationConstants.getRollingCoefficient().toString();
    drivetrainLossInput.value = calculationConstants.getDriveTrainLoss().toString();
}

function saveConstants(): void {
    calculationConstants.setLocalGravitationalConstant(parseFloat(localGravitationalConstantInput.value));
    calculationConstants.setAirDensity(parseFloat(airDensityInput.value));
    calculationConstants.setCDA(parseFloat(cdaInput.value));
    calculationConstants.setFrontalArea(parseFloat(frontalAreaInput.value));
    calculationConstants.setRollingCoefficient(parseFloat(rollingCoefficientInput.value));
    calculationConstants.setDrivetrainLoss(parseFloat(drivetrainLossInput.value));
}

setConstantValues();

saveButton.addEventListener("click", () => {
    const settingsPopupBox: HTMLDivElement = popupMainWindow.querySelector("#settingsPopupContent")!

    saveConstants();

    settingsPopupBox.style.display = "none";
    popupMainWindow.style.display = "none";
})