/* jshint esversion: 6 */

"use strict";

// ***********************************
// Global variables
// ***********************************
const perPage = 10; // set number of students per page
let currentPage = 1; // default the start page to one on load

// DOM elements
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
    showButtons(students.length + 1);
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
    for(let i = 1; i <= pageCount; i++) {
        numberLinks += createLink(i);
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
    let li = "<li>" + 
                "<a href='#'" + active + ">" + number + "</a>" +
             "</li>";
    return li;
}



// ***********************************
// Event listeners
// ***********************************
paginationElement.onclick = (e) => {
    if (e.target.tagName === "A") {
        currentPage = parseInt(e.target.textContent);
        showStudents();
    }
}


// ***********************************
// Main entry
// ***********************************

showStudents();


