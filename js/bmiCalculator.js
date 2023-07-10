"use strict";

const bmiCalculatorTabBtns = document.querySelectorAll(".bmiCalculatorBtn");
const bmiCalculator = document.querySelectorAll(".bmiCalculator");
const usUnitsForm = document.querySelector(".usUnits form");
const metricUnitsForm = document.querySelector(".metricUnits form");
const genderRadios = document.querySelectorAll('.bmiCalculator input[name="gender"]');
const feetInput = document.querySelector('.bmiCalculator .feet input');
const inchesInput = document.querySelector('.bmiCalculator .inches input');
const poundsInput = document.querySelector('.bmiCalculator .pounds input');
const displayUsUnits = document.querySelector('.usUnitsCalculatorDisplay');
const displayMetricUnits = document.querySelector(".metricUnitsCalculatorDisplay");
const heightCmInput = document.querySelector('#heightCm');
const weightKgInput = document.querySelector('#weightKg');


function getCategory(bmi, gender) {
    const bmiCategories = {
        '16': 'Severe thinness',
        '17': 'Moderate thinness',
        '18.5': 'Mild thinness',
        '25': 'Normal',
        '30': 'Overweight',
        '35': 'Obese Class I',
        '40': 'Obese Class II'
    };

    if (gender === 'male' || gender === 'female') {
        for (const category in bmiCategories) {
            if (bmi < parseFloat(category)) {
                return bmiCategories[category];
            }
        }
        return 'Obese Class III';
    }
}

function calculateRotation(targetValue) {
    const totalDivisions = 42.2;
    const degreesPerDivision = 180 / (totalDivisions + 60);

    let rotation = 0;

    if (targetValue > totalDivisions) {
        rotation = 180;
    } else {
        rotation = targetValue <= 25
            ? targetValue * degreesPerDivision
            : (25 * degreesPerDivision) + ((targetValue - 25) * (5 * degreesPerDivision));
    }

    return rotation;
}

function clearActiveTab() {
    bmiCalculatorTabBtns.forEach(btn => btn.classList.remove("active"));
    bmiCalculator.forEach(item => item.classList.remove("bmiCalculatorActive"));
}

function navigationTab() {
    bmiCalculatorTabBtns.forEach(btn => btn.addEventListener("click", handleTabClick));
}

function handleTabClick() {
    clearActiveTab();
    const btnId = this.id;
    this.classList.toggle("active", this.classList.contains(btnId));
    bmiCalculator.forEach(item => item.classList.toggle("bmiCalculatorActive", item.classList.contains(btnId)));
}

function selectGender() {
    let gender = '';

    for (const radio of genderRadios) {
        if (radio.checked) {
            gender = radio.id;
            break;
        }
    }

    return gender;
}

function createDisplay(item, id) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "bmiCalcShowActive");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("width", "300px");
    svg.setAttribute("height", "163px");
    svg.setAttribute("viewBox", "0 0 300 163");
    svg.innerHTML = `
            <g transform="translate(18,18)" style="font-family:arial,helvetica,sans-serif;font-size: 12px;">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7"></polygon>
                </marker>
                <path id="curvetxt1" d="M-4 140 A140 140, 0, 0, 1, 284 140" style="fill: none;"></path>
                <path id="curvetxt2" d="M33 43.6 A140 140, 0, 0, 1, 280 140" style="fill: none;"></path>
                <path id="curvetxt3" d="M95 3 A140 140, 0, 0, 1, 284 140" style="fill: none;"></path>
                <path id="curvetxt4" d="M235.4 33 A140 140, 0, 0, 1, 284 140" style="fill: none;"></path>
              </defs>
              <path d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 L140 140 Z" fill="#bc2020"></path>
              <path d="M6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 L140 140 Z" fill="#d38888"></path>
              <path d="M12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z" fill="#ffe400"></path>
              <path d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z" fill="#008137"></path>
              <path d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z" fill="#ffe400"></path>
              <path d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z" fill="#d38888"></path>
              <path d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z" fill="#bc2020"></path>
              <path d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z" fill="#8a0101"></path>
              <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff"></path>
              <circle cx="140" cy="140" r="5" fill="#666"></circle>
              <g style="paint-order: stroke;stroke: #fff;stroke-width: 2px;">
                <text x="25" y="111" transform="rotate(-72, 25, 111)">16</text>
                <text x="30" y="96" transform="rotate(-66, 30, 96)">17</text>
                <text x="35" y="83" transform="rotate(-57, 35, 83)">18.5</text>
                <text x="97" y="29" transform="rotate(-18, 97, 29)">25</text>
                <text x="157" y="20" transform="rotate(12, 157, 20)">30</text>
                <text x="214" y="45" transform="rotate(42, 214, 45)">35</text>
                <text x="252" y="95" transform="rotate(72, 252, 95)">40</text>
              </g>
              <g style="font-size: 14px;">
                <text>
                  <textPath xlink:href="#curvetxt1">Underweight</textPath>
                </text>
                <text>
                  <textPath xlink:href="#curvetxt2">Normal</textPath>
                </text>
                <text>
                  <textPath xlink:href="#curvetxt3">Overweight</textPath>
                </text>
                <text>
                  <textPath xlink:href="#curvetxt4">Obesity</textPath>
                </text>
              </g>
              <line x1="140" y1="140" x2="65" y2="140" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)">
                <animateTransform id=${id} attributeName="transform" attributeType="XML" type="rotate" from="0 140 140" to="5 140 140" dur="1s" fill="freeze" repeatCount="1"></animateTransform>
              </line>
              <text id=${item} x="67" y="120" style="font-size: 30px;font-weight:bold;color:#000;">BMI = 14.6</text>
            </g>
          `;
    return svg;
}

function createResult(kgOrLbs, bmi, category, healthyMin, healthyMax, healthyWeightMin, healthyWeightMax, weightDifference, bmiPrime, ponderalIndex, isMetricUnits, pounds, heightInches) {
    let action = "";
    let targetBMI = 0;

    if (bmi > 25) {
        action = "Lose";
        targetBMI = 25;
    } else if (bmi < 18.5) {
        action = "Gain";
        targetBMI = 18.5;
    }

    let weightChange = 0;
    if (isMetricUnits) {
        if (action === "Lose") {
            weightChange = bmi - targetBMI;
        } else if (action === "Gain") {
            weightChange = targetBMI - bmi;
        }
    } else {
        if (action === "Lose") {
            weightChange = ((pounds - (targetBMI * (heightInches ** 2 / 703)))).toFixed(1);
        } else if (action === "Gain") {
            weightChange = (((targetBMI * (heightInches ** 2 / 703)) - pounds)).toFixed(1);
        }
        
    }

    return `
    <p class="bmiResult">
        <span> BMI = ${bmi.toFixed(1)} kg/m² (${category}) </span>
        <br><br>
        Healthy BMI range: ${healthyMin.toFixed(1)} kg/m² - ${healthyMax.toFixed(1)} kg/m²
        <br>
        Healthy weight for the height: ${healthyWeightMin.toFixed(1)} lbs - ${healthyWeightMax.toFixed(1)} lbs
        <br>
        ${action} ${Math.abs(weightChange)} ${kgOrLbs} to reach a BMI of ${targetBMI.toFixed(1)} kg/m².
        <br>
        BMI Prime: ${bmiPrime.toFixed(2)}
        <br>
        Ponderal Index: ${ponderalIndex.toFixed(1)} kg/m³
    </p>
  `;
}

function initBIMCalculator() {
    usUnitsForm.addEventListener('submit', function (e) {
        displayMetricUnits.innerHTML = "";
        e.preventDefault();

        const feet = parseFloat(feetInput.value);
        const inches = parseFloat(inchesInput.value) || 0;
        const pounds = parseFloat(poundsInput.value);

        if (feet && pounds) {

            const heightInches = feet * 12 + inches;
            const heightMeters = heightInches * 0.0254;
            const weightKg = pounds * 0.453592;
            const bmi = weightKg / (heightMeters * heightMeters);
            const healthyMin = 18.5;
            const healthyMax = 25;
            const healthyWeightMin = healthyMin * (heightMeters ** 2) / 0.453592;
            const healthyWeightMax = healthyMax * (heightMeters ** 2) / 0.453592;
            const weightDifference = (healthyMin * (heightMeters ** 2) / 0.453592) - weightKg;
            const bmiPrime = bmi / 25;
            const ponderalIndex = weightKg / Math.pow(heightMeters, 3);
            const category = getCategory(bmi, selectGender());

            displayUsUnits.innerHTML = "";
            displayUsUnits.appendChild(createDisplay("bmiUsUnits", "sliderUsUnits"));

            const slider = document.querySelector("#sliderUsUnits");
            const bmiText = document.querySelector("#bmiUsUnits");
            slider.setAttribute("to", `${calculateRotation(bmi)} 140 140`);
            bmiText.textContent = `BMI = ${bmi.toFixed(1)}`;

            displayUsUnits.insertAdjacentHTML("beforeend", createResult("lbs",bmi, category, healthyMin, healthyMax, healthyWeightMin, healthyWeightMax, weightDifference, bmiPrime, ponderalIndex,false,pounds,heightInches));
        }
    });

    usUnitsForm.addEventListener('reset', function () {
        displayUsUnits.textContent = '';
    });

    metricUnitsForm.addEventListener('submit', function (e) {
        displayUsUnits.innerHTML = "";
        e.preventDefault();

        const heightCm = parseFloat(heightCmInput.value);
        const weightKg = parseFloat(weightKgInput.value);

        if (heightCm && weightKg) {

            const heightMeters = heightCm / 100;
            const bmi = weightKg / (heightMeters * heightMeters);
            const healthyMin = 18.5;
            const healthyMax = 25;
            const healthyWeightMin = healthyMin * (heightMeters ** 2);
            const healthyWeightMax = healthyMax * (heightMeters ** 2);
            const weightDifference = healthyWeightMin - weightKg;
            const bmiPrime = bmi / 25;
            const ponderalIndex = weightKg / Math.pow(heightMeters, 3);
            const category = getCategory(bmi, selectGender());

            displayMetricUnits.innerHTML = "";
            displayMetricUnits.appendChild(createDisplay("bmiMetricUnits", "sliderMetricUnits"));

            const slider = document.querySelector("#sliderMetricUnits");
            const bmiText = document.querySelector("#bmiMetricUnits");
            slider.setAttribute("to", `${calculateRotation(bmi)} 140 140`);
            bmiText.textContent = `BMI = ${bmi.toFixed(1)}`;

            displayMetricUnits.insertAdjacentHTML("beforeend", createResult("kg",bmi, category, healthyMin, healthyMax, healthyWeightMin, healthyWeightMax, weightDifference, bmiPrime, ponderalIndex,true));

        }
    });

    metricUnitsForm.addEventListener('reset', function () {
        displayMetricUnits.textContent = '';
    });
    navigationTab();
}

export { initBIMCalculator };


