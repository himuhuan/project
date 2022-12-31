// noinspection JSJQueryEfficiency

/* According media screen to change some style */
const mQuery = window.matchMedia('(max-width: 960px)')
/* preload background */
let img = new Image();
img.src = "../images/backgrounds/Dark/background1.jpg";

/* load theme according to time */
// 0 -- Light, 1 -- Dark;
let gWebsiteThemeFlag = 0;

function changeTheme() {
    changeBgBoxImage();
    if (gWebsiteThemeFlag === 0) {
        $("#main-nav").addClass("bg-dark").removeClass("bg-white").removeClass("opacity-85")
            .removeClass("navbar-light").addClass("navbar-dark");
        $("#dropdown-list").addClass("dropdown-menu-dark");
        document.documentElement.style.setProperty("--bs-body-color", "#ffffff");
        document.documentElement.style.setProperty("--bs-body-bg", "#333333");
        document.documentElement.style.setProperty("--bs-secondary", "#e5e5e5");
        gWebsiteThemeFlag = 1;
    } else {
        $("#main-nav").addClass("bg-white").removeClass("bg-dark").addClass("opacity-85")
            .removeClass("navbar-dark").addClass("navbar-light");
        $("#dropdown-list").removeClass("dropdown-menu-dark");
        document.documentElement.style.setProperty("--bs-body-color", "#000000");
        document.documentElement.style.setProperty("--bs-body-bg", "#ffffff");
        document.documentElement.style.setProperty("--bs-secondary", "#9f9f9f");
        gWebsiteThemeFlag = 0;
    }
}

$(document).ready(function () {
    let now = new Date();
    if (now.getHours() >= 12) {
        console.log("set to dark");
        changeTheme();
        gWebsiteThemeFlag = 1;
    }
    /* mobile nav */
    $("#nav-menu-button").click(function (event) {
        $("#nav-sidebar").css({
            "display": "flex",
            "width": "400px"
        });
        event.stopPropagation();
    })
    /* timer */
    updateTimer();

    /* sidebar */
    $("#nav-sidebar").mouseover(function () {
        if (!mQuery.matches) {
            $("#nav-sidebar").css({
                "width": "150px",
                "height": "100vh",
                "top": "0",
                "position": "fixed"
            });
        }
    }).mouseout(function () {
        if (!mQuery.matches) {
            $("#nav-sidebar").css({
                "width": "0px",
                "height": "100%",
                "top": "0",
                "position": "fixed"
            });
        }
    });

    $("#close-cookie-banner").click(function () {
        $(".cookie-banner").slideUp(300);
    });

    $("#nav-index").click(function () {
        $(".dropdown-menu").slideDown(300);
    });

    $(".dropdown-menu").mouseleave(function () {
        $(".dropdown-menu").slideUp(600);
    }).mousedown(function () {
        $(".dropdown-menu").slideUp(300);
    })

    $("#search-bar").click(function (event) {
        if (mQuery.matches) {
            $("#home-timer").css("display", "none");
        }
        $(".home-searchbar").css("width", "500px");
        $(".bgbox").css({
            "transform": "scale(1.1)",
            "filter": "blur(20px)"
        });
        event.stopPropagation();
    }).on("keypress", function (event) {
        if (event.keyCode === 13) {
            let url = "https://cn.bing.com/search?q=";
            url += $("#search-bar").val();
            window.open(url, "_blank");
            $("#search-bar").val("");
        }
    })

    $("#theme-switch").click(function () {
        changeTheme();
    });

    $(document).click(function () {
        $(".home-searchbar").css("width", "250px");
        $(".bgbox").css({
            "transform": "scale(1.0)",
            "filter": "blur(0px)"
        });
        $("#home-timer").css("display", "block");
        $(".home-sidebar").css("width", "0px");
    })
});

/* Autoplay backgrounds  */
let backgroundBoxes = document.getElementsByClassName("bgbox");
let bgIndex = 0;

function autoPlay() {
    for (let i = 1; i < backgroundBoxes.length; i++) {
        if (!backgroundBoxes[i].complete) {
            console.log(`image ${i} not load`);
            return;
        }
    }
    backgroundBoxes[bgIndex].classList.remove("bgbox-show");
    bgIndex++;
    bgIndex = bgIndex % backgroundBoxes.length;
    backgroundBoxes[bgIndex].classList.add("bgbox-show");
}

setInterval(autoPlay, 15000);

function timer() {
    let min = String(new Date().getMinutes()).padStart(2, '0');
    let hour = String(new Date().getHours()).padStart(2, '0');
    return `${hour} : ${min}`;
}

function updateTimer() {
    $("#home-timer").text(timer());
}

function changeBgBoxImage() {
    for (let i = 0; i < backgroundBoxes.length; i++) {
        let src = backgroundBoxes[i].getAttribute("src");
        if (gWebsiteThemeFlag === 0) {
            backgroundBoxes[i].setAttribute("src",
                src.replace("Light", "Dark"));
        } else {
            backgroundBoxes[i].setAttribute("src",
                src.replace("Dark", "Light"));
        }
    }
}

setInterval(updateTimer, 10000);
