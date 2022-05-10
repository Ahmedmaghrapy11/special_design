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
        
        // remove active class from all children
        event.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        
        // add active class on self
        event.target.classList.add("active");

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
        
        // remove active class from all children
        event.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        
        // add active class on self
        event.target.classList.add("active");

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

    // console.log(skillsOffsetTop +"\n"+ skillsOuterHeight +"\n"+ windowHeight +"\n"+ windowScrollTop);

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