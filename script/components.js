// noinspection JSJQueryEfficiency

/* According media screen to change some style */
const mQuery = window.matchMedia('(max-width: 960px)')

$(document).ready(function () {

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
            "transform" : "scale(1.1)",
            "filter" : "blur(20px)"
        });
        event.stopPropagation();
    }).on("keypress", function (event) {
        if (event.keyCode === 13) {
            let url = "https://cn.bing.com/search?q=";
            url += $("#search-bar").val();
            window.open(url,"_blank");
            $("#search-bar").val("");
        }
    })

    $(document).click(function () {
        $(".home-searchbar").css("width", "250px");
        $(".bgbox").css({
            "transform" : "scale(1.0)",
            "filter" : "blur(0px)"
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

setInterval(updateTimer, 10000);
