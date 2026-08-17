// Each section is represented by a dot on the side bar.
// Highlights the navigation dots corresponding to the section when scrolling and navigating the page.


// --------------------------------------------------
// VARIABLES
// --------------------------------------------------

// Navigation bar container element
const containerVerticalNav = document.body.querySelector("ul.vertical-nav__list-items");

// Definition of variables that point to DOM objects using the .nav_page selector
const arrayOfNavPage = document.getElementsByClassName("nav-page");

// Definition of variables that point to the navigation dots, will be created and defined in main
let arrayOfDotsNav;

// Throttle variable for the scroll event listener
let isThrottled = false;

// For testing and debugging
let scrollCount = 0;




// --------------------------------------------------
// FUNCTIONS
// --------------------------------------------------

// Dot calculation
// --------------------------------------------------

// Calculates and returns the index of the element closest to the top of the page. Takes an array of elements.
const nearestFromTheTop = (arrayOfElements) => {

    // Creates an array of distances from the top of the page for each element
    let arrayOfDistance = [];
    Array.from(arrayOfElements).forEach(element => {
        let infoObject = element.getBoundingClientRect();
        arrayOfDistance.push(infoObject.top);
    })

    // Selects the visible element closest to the top of the screen
    // As the elements are naturally sorted in the order of the page,
    // it is enough to find the first non-negative element.
    return arrayOfDistance.findIndex(element => element > 0);
}

// Dot creation
// --------------------------------------------------

// Reset and empty the navigation bar container
const resetVerticalNav = () => {
    if (containerVerticalNav) {
        containerVerticalNav.innerHTML = "";
    } else {
        console.log("No container found for verticals dots nav. Need ul.vertical-nav__list-items")
    };
}

// Add dots to the navigation bar
//      1. Create li.vertical-nav__item to add to ul.vertical-nav__list-items
//      2. Create div.vertical-nav__point to add to li.vertical-nav__item
const createDots = (numberOfDots) => {
    if (containerVerticalNav) {
        for (let i = 0; i < numberOfDots; i++) {
            const li = document.createElement("li");
            li.classList.add("vertical-nav__item");
            li.setAttribute("data-dot-index", i);

            const dot = document.createElement("div");
            dot.classList.add("vertical-nav__point");

            containerVerticalNav.appendChild(li);
            li.appendChild(dot);
        }
    } else {
        console.log("No container found for verticals dots nav. Need ul.vertical-nav__list-items")
    }
};

// Returns the array of dots
const getDotsNav = () => document.getElementsByClassName("vertical-nav__point");


// Dot modification
// --------------------------------------------------

// Reset dots to default style
const resetDots = () => {
    Array.from(arrayOfDotsNav).forEach(dot => {
        dot.style.backgroundColor = "lightgrey";
        dot.style.width = "10px";
        dot.style.height = "10px";
    })
}

// Highlight the active dot
const makeBigger = (element) => {
    element.style.backgroundColor = "var(--color-text)";
    element.style.width = "12px";
    element.style.height = "12px";
};

// Callback for scroll event listener.
// Highlights the correct dot and manages throttle.
const changeDot = () => {
    resetDots();
    const navPageIndex = nearestFromTheTop(arrayOfNavPage);
    if (navPageIndex >= 0) {
        makeBigger(arrayOfDotsNav[navPageIndex])
    };

    // Resets the throttle
    isThrottled = false;
};




// --------------------------------------------------
// MAIN
// --------------------------------------------------

// Test and debug
// --------------------------------------------------

// Dynamic creation of vertical navigation dots
// --------------------------------------------------

resetVerticalNav();
createDots(arrayOfNavPage.length);
arrayOfDotsNav = getDotsNav();

// Event handling
// --------------------------------------------------

window.addEventListener("scroll", (event) => {

    scrollCount++;

    // Set up a "throttle" to limit code activation by scroll events
    // Throttle test, exit the loop if active.
    if (isThrottled) return;
    isThrottled = true;
    // Start the timer.
    setTimeout(changeDot, 300);

})

