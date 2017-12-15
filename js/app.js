/* jshint esversion: 6 */

"use strict";

// ***********************************
// Global variables
// ***********************************
const perPage = 10; // set number of students per page
let currentPage = 1; // default the start page to one on load
const pageElement = document.querySelector(".page");
const paginationElement = document.createElement("div");
paginationElement.className = "pagination";
pageElement.appendChild(paginationElement);



// ***********************************
// Functions
// ***********************************

/**
 * Choose which students to display on the current page
 */
function showStudents() {
    const students = document.querySelectorAll(".student-item");
    // Determine final student to be displayed on page
    const endVal = currentPage * perPage;
    const startVal = endVal - perPage;

    // Loop through students array 
    for (let i = 0; i < students.length; i++ ) {
        if (i >= startVal && i < endVal) {
            // remove the hide class to show the student
            students[i].classList.remove("hide");
        } else {
            // hide the student
            students[i].classList.add("hide");            
        }
    }
    showButtons();
} 

/**
 * Add page number navigation buttons
 */
function showButtons() {
    
}




// ***********************************
// Event listeners
// ***********************************

// ***********************************
// Main entry
// ***********************************

showStudents();


