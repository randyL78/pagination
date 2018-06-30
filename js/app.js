/* jshint esversion: 6 */

"use strict";

// ***********************************
// Global variables
// ***********************************
const perPage = 10; // set number of students per page
let currentPage = 1; // default the start page to one on load

// DOM elements
const header = document.querySelector(".page-header");
header.innerHTML = `
    <h2>Students</h2>
    <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
    </div>`;
const searchBar = header.querySelector("input");
const searchButton = header.querySelector("button");
const pageElement = document.querySelector(".page");
const paginationElement = document.createElement("div");
paginationElement.className = "pagination";
pageElement.appendChild(paginationElement);
const students = document.querySelectorAll(".student-item");
let subStudents = students;

// ***********************************
// Functions
// ***********************************

/**
 * Choose which students to display on the current page
 */
function showStudents() {
    // Determine final student to be displayed on page
    const endVal = currentPage * perPage;
    const startVal = endVal - perPage;
    
    // Hide all the students initially
    hideStudents();
    
    // Loop through array of students that pertain to current page 
    for (let i = startVal; i < endVal && i < subStudents.length; i++ ) {
        // remove the hide class to show the student
        subStudents[i].classList.remove("hide");
    }
    showButtons(subStudents.length);
} 

/**
 * Hide all of the students
 */
function hideStudents() {
    students.forEach( student => {
        student.classList.add("hide");
    });
}

/**
 * Add page number navigation buttons
 * @param {number} numberOfStudents - the number of elements in the current array of students
 */
function showButtons(numberOfStudents) {
    let pageCount = Math.floor(numberOfStudents / perPage);
 
    // if number of students is not a multiple of 'perPage' add 1 additional page for remainder
    if (numberOfStudents % perPage) {
        pageCount += 1;
    }
    // Create string representation of html
    let numberLinks = "<ul>";
    if (pageCount > 1) {
        for(let i = 1; i <= pageCount; i++) {
            numberLinks += createLink(i);
        }
    }
    // if the array of students to display is empty, display a message
    if (subStudents.length === 0) {
        numberLinks += "<h3>We're sorry, there are no students with that name</h3>"
    }
    numberLinks += "</ul>";
    paginationElement.innerHTML = numberLinks;
}

/**
 * Create string representation of page navigation link
 * @param {number} number - The page number to display on button
 * @returns {string} String representation of navigation link 
 */
function createLink(number) {
    let active = "";
    // highlight the current page in the buttons
    if (number === currentPage) {
        active = "class='active'";
    }
    let li = `<li>  
                <a href='#'${active}>${number}</a>
             </li>`;
    return li;
}

/**
 * Create a sub array of students based on search bar value
 * @param {string} value - the value to search the array by
 */
function searchStudents(value) {
    currentPage = 1;
    subStudents = [];
    for (let i = 0; i < students.length; i++) {
        const name = students[i].querySelector("h3").innerText.toLowerCase();
        if (name.includes(value.toLowerCase() ) ) {
            subStudents.push(students[i] );
        }
    }
    showStudents();
}

// ***********************************
// Event listeners
// ***********************************
// Pagination events
paginationElement.onclick = e => {
    if (e.target.tagName === "A") {
        currentPage = parseInt(e.target.textContent);
        showStudents();
    }
}

// Search events
searchBar.onkeyup = e => searchStudents(searchBar.value);
searchButton.onclick = e => searchStudents(searchBar.value);


// ***********************************
// Initial Tasks
// ***********************************
showStudents();
