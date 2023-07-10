"use strict";

const ageCalculatorDisplay = document.querySelector(".ageCalculatorDisplay");
const calculateAge = document.querySelector("#calculateAge");

let firstDay = new Date(2023, 7, 1);
let dayNow = new Date(2023, 7, 30);
let state = 0;

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function toggleCalendar(currElem) {
    document.querySelector(currElem).classList.toggle("active");
}

function calculateTimeElapsed(endDate, startDate) {
    const diffInMilliseconds = Math.abs(endDate - startDate);
    const diffDate = new Date(diffInMilliseconds);

    const years = diffDate.getUTCFullYear() - 1970;
    const months = diffDate.getUTCMonth();
    const day = diffDate.getUTCDate() - 1;
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;


    const result = `
    <span> Age: </span>   
        <p>
          ${years} years ${months} months ${day} days <br>
          or ${years * 12 + months} months ${day} days <br>
          or ${weeks} weeks ${remainingDays} days <br>
          or ${days} days <br>
          or ${hours} hours <br>
          or ${minutes} minutes <br>
          or ${seconds} seconds <br>
        </p>
    `;

    return result;
}

function createCalendar(targetElement, daySelect, monthSelect, yearInput, toggleFunction, currentDay) {

    const date = new Date(yearInput.value, monthSelect.value, daySelect.value);
    let year = date.getFullYear();
    let month = date.getMonth();

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendarContainer = document.querySelector(targetElement);

    function createHeader() {
        const header = document.createElement('div');
        header.classList.add('header');

        const prevButton = document.createElement('button');
        prevButton.textContent = '<<';
        prevButton.addEventListener('click', showPreviousMonth);
        header.appendChild(prevButton);

        const monthTitle = document.createElement('span');
        monthTitle.classList.add('current-month');
        monthTitle.textContent = monthNames[month] + ' ' + year;
        header.appendChild(monthTitle);

        const nextButton = document.createElement('button');
        nextButton.textContent = '>>';
        nextButton.addEventListener('click', showNextMonth);
        header.appendChild(nextButton);

        calendarContainer.appendChild(header);
    }

    clearCalendar();

    function createTable() {
        const table = document.createElement('table');
        table.classList.add('calendar-table');

        const weekdaysRow = document.createElement('tr');

        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th');
            th.textContent = daysOfWeek[i];
            weekdaysRow.appendChild(th);
        }

        table.appendChild(weekdaysRow);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = month === 1 ? (isLeapYear(year) ? 29 : 28) : new Date(year, month + 1, 0).getDate();

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    const td = document.createElement('td');
                    row.appendChild(td);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const td = document.createElement('td');
                    td.textContent = date;
                    td.addEventListener('click', selectDate);
                    row.appendChild(td);
                    date++;
                }
            }

            table.appendChild(row);
        }

        calendarContainer.appendChild(table);
    }

    function showPreviousMonth() {
        if (month === 0) {
            year--;
            month = 11;
        } else {
            month--;
        }

        clearCalendar();
        createHeader();
        createTable();
    }

    function showNextMonth() {
        if (month === 11) {
            year++;
            month = 0;
        } else {
            month++;
        }

        clearCalendar();
        createHeader();
        createTable();
    }

    function selectDate(event) {
        const selectedDate = event.target.textContent;
        const selectedMonth = month;
        const selectedYear = year;

        const current = currentDay === "firstDay" ? '.dateOfBirth td' : '.ageAtTheDateOf td';

        document.querySelectorAll(current).forEach((btn) => {
            btn.classList.remove("active");
        });

        event.target.classList.add("active");


        function createDay() {
            while (daySelect.firstChild) {
                daySelect.firstChild.remove();
            }

            const daysInMonth = month === 1 ? (isLeapYear(year) ? 29 : 28) : new Date(year, month + 1, 0).getDate();

            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
        }

        function createMonth() {
            monthSelect.innerHTML = '';

            for (let i = 0; i < 12; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = monthNames[i];
                monthSelect.appendChild(option);
            }
        }

        createDay();
        createMonth();
        toggleFunction();
        daySelect.value = selectedDate;
        monthSelect.value = selectedMonth;
        yearInput.value = selectedYear;

        const d = new Date(selectedYear, selectedMonth, selectedDate);
        if (currentDay === "firstDay") {
            firstDay = d;
        } else {
            dayNow = d;
        }
    }

    function clearCalendar() {
        while (calendarContainer.firstChild) {
            calendarContainer.firstChild.remove();
        }
    }

    function updateSelectedDate(e) {
        const selectedYear = parseInt(yearInput.value);
        const selectedMonth = parseInt(monthSelect.value);
        const selectedDate = parseInt(daySelect.value);

        const d = new Date(selectedYear, selectedMonth, selectedDate);
        if (currentDay === "firstDay") {
            firstDay = d;
        } else {
            dayNow = d;
        }

        function createDay() {
            while (daySelect.firstChild) {
                daySelect.firstChild.remove();
            }

            const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }

            daySelect.value = selectedDate;

        }
        daySelect.value = selectedDate;

        createDay();
    }

    createHeader();
    createTable();

    const calendarTable = calendarContainer.querySelector('.calendar-table');
    const dateCells = calendarTable.getElementsByTagName('td');

    let initialDate = 0;

    if (state < 2) {
        initialDate = currentDay === "firstDay" ? 1 : 30;
        state++;
    } else {
        initialDate = currentDay === "firstDay" ? daySelect.value : daySelect.value;
    }

    for (let i = 0; i < dateCells.length; i++) {
        if (dateCells[i].textContent === initialDate.toString()) {
            dateCells[i].click();
            toggleFunction(); 
            break;
        }
    }

    daySelect.addEventListener('change', updateSelectedDate);
    monthSelect.addEventListener('change', updateSelectedDate);
    yearInput.addEventListener('change', updateSelectedDate);
}

function initAgeCalculator() {
    const calendarData = [
        {
            selector: '.calendar',
            toggleFunction: () => {
                toggleCalendar(".calendar");
            },
            dayId: 'day',
            monthId: 'month',
            yearId: 'year',
            defaultOption: 'firstDay'
        },
        {
            selector: '.calendarATDO',
            toggleFunction: () => {
                toggleCalendar(".calendarATDO");
            },
            dayId: 'dayATDO',
            monthId: 'monthATDO',
            yearId: 'yearATDO',
            defaultOption: 'dayNow'
        }
    ];

    document.querySelector('.calendarLogo').addEventListener('click', () => {
        toggleCalendar(".calendar");
    });
    document.querySelector('.calendarLogoATDO').addEventListener('click', () => {
        toggleCalendar(".calendarATDO");
    });

    document.addEventListener('DOMContentLoaded', function () {
        calendarData.forEach(data => {
            const daySelect = document.getElementById(data.dayId);
            const monthSelect = document.getElementById(data.monthId);
            const yearInput = document.getElementById(data.yearId);

            createCalendar(data.selector, daySelect, monthSelect, yearInput, data.toggleFunction, data.defaultOption);

            [daySelect, monthSelect, yearInput].forEach(element => {
                element.addEventListener('change', () => {
                    createCalendar(data.selector, daySelect, monthSelect, yearInput, data.toggleFunction, data.defaultOption);
                });
            });
        });
    });

    calculateAge.addEventListener("click", () => {
        ageCalculatorDisplay.innerHTML = calculateTimeElapsed(dayNow, firstDay);
    });

    ageCalculatorDisplay.innerHTML = calculateTimeElapsed(dayNow, firstDay);
}

export { initAgeCalculator };
