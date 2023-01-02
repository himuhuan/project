// noinspection JSJQueryEfficiency

/* According media screen to change some style */
const mQuery = window.matchMedia('(max-width: 768px)');
/* preload background */
let img = new Image();
img.src = "../images/backgrounds/Dark/background1.jpg";

/* load theme according to time */
// 0 -- Light, 1 -- Dark;
let gWebsiteThemeFlag = 0;

/**
 * daily words gen.
 * Himu 奇妙の伤感文学
 */
let dailyWords = [
    "奇迹、魔法，都是存在的",
    "要是别人说怀有希望是错误的事，不管几次我都一定会否定这句话，不管到什么时候。",
    "因为我找到了我的愿望，即使赌上性命去战斗也无所谓，我有了可以这样想的理由。",
    "无法回避的毁灭与叹息，一切都由你来颠覆即可，你具有的正是为此而生的力量。",
    `“要拯救你”这是我最初的心意，而到如今，这是最后留下的唯一路标。`,
    "我对普通的人类没有兴趣！",
    "如果樱花掉落的速度是每秒五厘米，那么两颗心要多久才能靠近？",
    "一个人要坚强的活下去，是很难的吧。",
    "自己喜欢的人的名字，不管什么状况都听得见吧！",
    "能哭的地方，只有厕所，和爸爸的怀里。",
    "将爱形容为美丽的，是不了解爱的人；将爱形容为丑陋的，是自以为了解爱的人。"
];

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
    let hour = new Date().getHours();
    if (hour >= 17 || hour <= 5) {
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
    });

    $("#search-bar").click(function (event) {
        if (mQuery.matches) {
            $("#home-timer").css("display", "none");
        }
        $(".home-searchbar").css("width", "500px");
        $(".daily-words").fadeIn(2000)
            .text(dailyWords[Math.round(Math.random() * dailyWords.length)]);
        $(".tip-words").fadeOut("slow");
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
    });

    $(document).click(function () {
        $(".home-searchbar").css("width", "250px");
        $(".bgbox").css({
            "transform": "scale(1.0)",
            "filter": "blur(0px)"
        });
        $(".daily-words").css("display", "none");
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
