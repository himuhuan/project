
$(document).ready(function () {
    $("#nav-sidebar").mouseover(function () {
        $("#nav-sidebar").css({
            "width": "100px",
            "height": "100vh",
            "top": "0",
            "position": "fixed"
        });
    }).mouseout(function () {
        $("#nav-sidebar").css({
            "width": "0px",
            "height": "100%",
            "top": "0",
            "position": "fixed"
        });
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
});

/* Autoplay backgrounds  */
let backgroundBoxes = document.getElementsByClassName("bgbox");
let opa = 1;
let fadeOutTimer, fadeInTimer;
let bgIndex = 0;

function autoPlay() {
    backgroundBoxes[bgIndex].classList.remove("bgbox-show");
    bgIndex++;
    bgIndex = bgIndex % backgroundBoxes.length;
    backgroundBoxes[bgIndex].classList.add("bgbox-show");
}

let autoPlayer = setInterval(autoPlay, 15000);
