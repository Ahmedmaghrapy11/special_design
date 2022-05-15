// check if there is color option in local storage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));    
    // remove active class from all colors list element
    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        // add active class on element with data-color === localStorage
        if (element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        }
    });
}

// toggle spin class on icon
let x = document.querySelector(".toggle-settings .fa-gear");
x.onclick = function () {
    // toggle class fa-spin for rotation
    this.classList.toggle("fa-spin");
    // toggle class open to shift settings box
    document.querySelector(".settings-box").classList.toggle("open");
};

// switching colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop over each li in colorsLi
colorsLi.forEach( (li) => {
    // click on every list of colors
    li.addEventListener( "click", (event) => {
        // set color on root
        document.documentElement.style.setProperty("--main-color", event.target.dataset.color);
        // set color on local storage
        localStorage.setItem("color_option", event.target.dataset.color);
        handleActiveClasses(event);
    });
});

// random backgrounds option
let randBackGroundsOption = true;
// variable to control the interval
let backGroundInterval;
// check if there is a random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// check if random background local storage is empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        randBackGroundsOption = true;
    }
    else {
        randBackGroundsOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// switching random backgrounds
const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");
// loop over all spans
randomBackgroundsElement.forEach( (span) => {
    // click on every span
    span.addEventListener( "click", (event) => {
        handleActiveClasses(event);
        if (event.target.dataset.background === "yes") {
            randBackGroundsOption = true;
            randomizeBackgrounds();
            localStorage.setItem("background_option", true);
        }
        else {
            randBackGroundsOption = false;
            clearInterval(backGroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// switching backgrounds on landing page
// select landing page
let landingPage = document.querySelector(".landing-page");
// get images in array
let imgsArr = ["switch1.jpg","switch2.jpg","switch3.jpg","switch4.jpg","switch5.jpg"];
// function to randomize backgrounds
function randomizeBackgrounds() {
    if (randBackGroundsOption === true) {
        backGroundInterval = setInterval(() => {
            // get random number
            let randomNum = Math.floor(Math.random() * imgsArr.length);
            // change background imgs url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArr[randomNum] + '")';
        }, 1000);    
    }
}

randomizeBackgrounds();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window scroll top
    let windowScrollTop = this.pageYOffset;
    // operation to be checked
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        // select all skill progress span
        let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
        // loop over all spans to change it's width
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
// do the following actions for every clicked image
ourGallery.forEach(img => {
    img.addEventListener("click", (event) => {
        // create overlay div element
        let overlay = document.createElement("div");
        // add class to overlay div
        overlay.className = "popup-overlay";
        // append overlay to the body
        document.body.appendChild(overlay);
        // create the popup box
        let popupBox = document.createElement("div");
        // add class to the popup box
        popupBox.className = "popup-box";
        // check if there is an alt text
        if (img.alt !== null) {
            //create heading
            let imageHeading = document.createElement("h3");
            // create text for the heading
            let imgText = document.createTextNode(img.alt);
            // append the text to the heading
            imageHeading.appendChild(imgText);
            // append the heading to the popup box
            popupBox.appendChild(imageHeading);
            
        }
        // create the image
        let popupImage = document.createElement("img");
        // set image source
        popupImage.src = img.src;
        // append img to the popup box
        popupBox.appendChild(popupImage);
        // append popup box to the body
        document.body.appendChild(popupBox);
        // create the close span
        let closeButton = document.createElement("span");
        // create the close button text
        let closeButtonText = document.createTextNode('X');
        // append 'X' text to the close span
        closeButton.appendChild(closeButtonText);
        // add class to the close span
        closeButton.className = "close";
        // append close span the popup box
        popupBox.appendChild(closeButton);
    });
});

// close popup box
document.addEventListener("click", function (event) {
    if (event.target.className == "close") {
        // remove popup box from DOM
        event.target.parentNode.remove();
        // remove the overlay div from dom
        document.querySelector(".popup-overlay").remove();
    }
});

function scrollToSection(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (event) => {
            // stop the working of the default url
            event.preventDefault();
            // transfer to the clicked section using scrollIntoView()
            document.querySelector(event.target.dataset.section).scrollIntoView(
                {behavior: "smooth"}
            );
        });
    });
}

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

scrollToSection(allBullets);
scrollToSection(allLinks);

// handle active classes states
function handleActiveClasses(event) {
    // remove active class from all children
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // add active class on it self
    event.target.classList.add("active");
}

// show and hide bullets
let bulletsSpans = document.querySelectorAll(".bullets span");
let bulletsContainer = document.querySelectorAll(".nav-bullets");
let bulletLocalItems = localStorage.getItem("bullets_option");

if (bulletLocalItems !== null) {
    bulletsSpans.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItems === "show") {
        bulletsContainer.style.display = "block";
        document.querySelector(".show-bullets .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = "hide";
        document.querySelector(".show-bullets .no").classList.add("active");
    }
}
bulletsSpans.forEach(span => {
    span.addEventListener("click", (event) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        }
        else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActiveClasses(event);
    });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    // localStorage.removeItem("bullets_option");
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");

    // reload window
    window.location.reload();
};

// toggle menu
let toggleButton = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleButton.onclick = function (event) {
    event.stopPropagation();
    this.classList.toggle("menu-active");
    links.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (event) => {
    
    if (event.target !== toggleButton && event.target !== links) {
        if (links.classList.contains("open")) {
            toggleButton.classList.toggle("menu-active");
            links.classList.toggle("open");
        }
    }

});

links.onclick = function (event) {
    event.stopPropagation();
};