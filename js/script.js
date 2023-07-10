"use strict";

// imports
import { initMathCalculator } from "./mathCalculator.js";
import { initAgeCalculator } from "./ageCalculator.js";
import { initBIMCalculator } from "./bmiCalculator.js";

// Variables for Tabs
const menuElement = document.querySelector('.menu');
const burgerElement = document.querySelector('.burger');
const calculators = document.querySelectorAll(".calculator");

// Functions
function toggleMenu() {
  menuElement.classList.toggle('show');
  burgerElement.classList.toggle('active');
}

function handleTabButtonClick(event) {
  const button = event.target;
  calculators.forEach(calculator => {
    calculator.classList.toggle("active", calculator.classList.contains(button.textContent.trim()));
  });
  toggleMenu();
}

function initialize() {
  document.querySelectorAll("a").forEach(button => {
    button.addEventListener("click", handleTabButtonClick);
  });
  burgerElement.addEventListener("click", toggleMenu);

  initMathCalculator();
  initAgeCalculator();
  initBIMCalculator();
}

initialize();
